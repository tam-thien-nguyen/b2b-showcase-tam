import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './navigationbar'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useSelector } from 'react-redux'
import { pageMenuSelector } from '../../redux/slices/pageReducer'
import './topbar.css'
import { addTenantToUrl, homeUrl } from '../../services/service.config'
import AlgoliaSearchbar from '../AlgoliaSearchbar'
import { useContentful } from '../../context/contentful-provider'

const Logo = ({ onMouseOver }) => {
  const { fields } = useContentful()

  const [logoUrl, setLogoUrl] = useState('')
  const { companyLogo } = fields

  useEffect(() => {
    ;(async () => {
      if (
        companyLogo &&
        companyLogo.fields &&
        companyLogo.fields.file &&
        companyLogo.fields.file.url
      ) {
        setLogoUrl(companyLogo.fields.file.url)
      }
    })()
  }, [companyLogo])

  return (
    <Link to={homeUrl()} className="flex" onMouseOver={onMouseOver}>
      <div className="w-[37px]">
        <img src={logoUrl} alt={'Logo'} className="w-[37px]" />
      </div>
      <div className="px-4 text-white text-[25px] font-medium items-center">
        <span>{fields.companyNameLabel}</span>
      </div>
    </Link>
  )
}

const MegaNav = ({ showMegaMenuContent, setShowMegaMenuContent }) => {
  const [subMenuItems, setSubMenuItems] = useState([])
  const [showMegaMenuRightContent, setShowMegaMenuRightContent] =
    useState(false)
  const [subMenuMegaContent, setSubMenuMegaContent] = useState([])
  const onShowMegaMenu = () => setShowMegaMenuContent(true)
  const overMenuItem = (items) => {
    setSubMenuItems(items)
    if (!showMegaMenuContent) setShowMegaMenuContent(true)
  }
  const hideMegaMenuContent = () => {
    setShowMegaMenuContent(false)
  }
  const menuList = useSelector(pageMenuSelector)

  const { fields } = useContentful()
  return (
    <div className="dropdown flex text-base">
      {menuList.map((item, index) => (
        <button
          key={index}
          className="mega_menu_dropbtn"
          onMouseOver={() =>
            item.items.length !== 0
              ? overMenuItem(item.items)
              : hideMegaMenuContent()
          }
        >
          <Link to={!item.items.length ? addTenantToUrl(item.url) : homeUrl}>
            <div>
              {' '}
              {item.contentfulFieldName
                ? fields[item.contentfulFieldName]
                : item.title}
            </div>
          </Link>

          <ChevronDownIcon
            className={item.items.length ? 'ml-2 mt-1 h-5 w-5' : 'hidden'}
            aria-hidden="true"
          />
        </button>
      ))}
      {showMegaMenuContent ? (
        <div
          className="header-mega_dropdown-content"
          onMouseEnter={onShowMegaMenu}
          onClick={() => setShowMegaMenuContent(false)}
        >
          <div className="row w-full h-full flex">
            <div className="h-full w-[24%] mega_content_bg">
              <div className="pl-[72px] pt-[72px] overflow-y-auto max-h-full">
                <ul className=" text-white text-base font-bold">
                  {subMenuItems.map((item, index) => (
                    <Link replace key={index} to={addTenantToUrl(item.url)}>
                      <li
                        className="mega_content_category_li"
                        onMouseOver={() => {
                          setSubMenuMegaContent(item.items)
                          setShowMegaMenuRightContent(true)
                        }}
                        onMouseLeave={() => {
                          setShowMegaMenuRightContent(false)
                        }}
                      >
                        {item.title}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
            <div
              className="h-full w-[76%] grid grid-cols-4 overflow-y-auto gap-4 pl-[72px] pt-[72px] max-h-full"
              onMouseOver={() => setShowMegaMenuRightContent(true)}
            >
              {showMegaMenuRightContent
                ? subMenuMegaContent.map((item) => (
                    <div key={item.categoryId}>
                      <ul className=" text-black text-base">
                        <Link to={addTenantToUrl(item.url)}>
                          <li className="mega_content_sub_cat_li font-bold">
                            {item.title}
                          </li>
                        </Link>
                        {item.items.map((eachItem) => (
                          <Link
                            key={eachItem.categoryId}
                            to={addTenantToUrl(eachItem.url)}
                          >
                            <li className="mega_content_sub_cat_li">
                              {eachItem.title}
                            </li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

const TopNav = ({ title }) => {
  const nav_title_condition = title !== '' && title !== 'home' ? true : false
  const [showMegaMenuContent, setShowMegaMenuContent] = useState(false)

  return (
    <div
      className={
        title === 'home'
          ? 'desktop_only_flex w-full md:h-36 absolute z-10'
          : title === ''
          ? 'nav-background-title desktop_only_flex h-36'
          : 'desktop_only_flex w-full md:h-60 absolute z-10 nav-background-title'
      }
    >
      <div className="px-10 pt-[76px] w-full  flex xl:px-24  h-36">
        <div
          className="menu-wrapper flex w-full"
          onMouseLeave={() => {
            setShowMegaMenuContent(false)
          }}
        >
          <div className="flex justify-between w-full h-10">
            <Logo onMouseOver={() => setShowMegaMenuContent(false)} />

            <MegaNav
              showMegaMenuContent={showMegaMenuContent}
              setShowMegaMenuContent={setShowMegaMenuContent}
            />

            <div
              className="hidden lg:flex"
              onMouseOver={() => setShowMegaMenuContent(false)}
            >
              <AlgoliaSearchbar />
            </div>
          </div>
        </div>
      </div>
      {nav_title_condition && (
        <div className=" md:absolute mt-[176px] ml-24 text-white font-inter font-bold text-[32px]">
          {title}
        </div>
      )}
    </div>
  )
}

const Topbar = ({ title }) => {
  return (
    <>
      <Navbar />
      <TopNav title={title} />
    </>
  )
}

export default Topbar
