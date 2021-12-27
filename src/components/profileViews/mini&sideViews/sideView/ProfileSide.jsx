import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
    ThemeContext,
    themes
} from '../../../../contexts/themeContext/ThemeContext';
import ProfileSideOnePost from './ProfileSideOnePost';
import ProfileSideAllPosts from './ProfileSideAllPosts';

export default function ProfileSide(props) {
    const {
        blogID,
        /*blogName,*/
        /*setSidePostID, setShowSideBlog,*/ sidePostID,
        body
    } = props;
    const {
        avatar,
        header_image: headerImage,
        title,
        desciption,
        blog_name: blogName
    } = body;

    const [scrollTop, setScrollTop] = useState(0);
    const headerScrollAnimation = el => {
        setScrollTop(el.target.scrollTop);
    };
    const theme = useContext(ThemeContext)[0];

    const css = `
        .post-container{
            box-shadow: 0 0 0 1px rgba(${themes[theme].black},.07);
        }
        .overlay-no-theme {
            background-color: rgb(${themes[theme].navy});
        }
        .profile-side-header-avatar {
            opacity: ${Math.min(Math.max((108 - scrollTop) / 108, 0), 1)};
            ${scrollTop > 108 && 'display: none'}            
        }
        .profile-side-header-div-bg{
            filter: blur(${Math.min(scrollTop, 260) / 40}px);
            object-position: 0 ${Math.min(scrollTop / 2, 108)}px;
        }
    `;
    // const body = {
    //     username: 'huh',
    //     avatar: 'https://pbs.twimg.com/profile_images/1026496068555612160/Klg8BS8p_400x400.jpg',
    //     bg: 'https://i.ytimg.com/vi/6Vhp65bgKOo/maxresdefault.jpg',
    //     title: 'Heey man',
    //     description: 'wa wafbuaw uwbwakf'
    // };

    return (
        <div className="profile-side" onScroll={headerScrollAnimation}>
            <div className="profile-side-header">
                {/*scrollTop > 216 && (
                <img
                    className="profile-side-header-fixed"
                    src={body.bg}
                    alt="couldn't load bg"
                />
            )*/}
                <NavLink
                    to={`/blog/view/${blogName}/${blogID}`}
                    className="profile-side-header-div"
                >
                    <img
                        className="profile-side-header-div-bg"
                        src={headerImage}
                        alt="couldn't load bg"
                    />
                </NavLink>
                <NavLink to={`/blog/view/${blogName}/${blogID}`}>
                    <img
                        className="profile-side-header-avatar"
                        src={avatar}
                        alt="couldn't load avatar"
                    />
                </NavLink>

                <div className="profile-side-header-text">
                    <div className="profile-side-header-text-title">
                        {title}
                    </div>
                    <div className="profile-side-header-text-desc">
                        {desciption}
                    </div>
                </div>
                <div className="profile-side-header-post-container">
                    {sidePostID ? (
                        <ProfileSideOnePost
                            blogName={blogName}
                            blogID={blogID}
                            sidePostID={sidePostID}
                        />
                    ) : (
                        <ProfileSideAllPosts blogName={blogName} />
                    )}
                </div>
                <style>{css}</style>
            </div>
        </div>
    );
}

ProfileSide.propTypes = {
    blogID: PropTypes.string.isRequired,
    blogName: PropTypes.string.isRequired,
    setShowSideBlog: PropTypes.func,
    setSidePostID: PropTypes.func,
    body: PropTypes.object.isRequired,
    sidePostID: PropTypes.string
};