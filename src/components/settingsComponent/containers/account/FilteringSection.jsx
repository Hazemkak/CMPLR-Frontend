import React, { useState, useContext, useEffect } from 'react';
import { SettingsContext } from '../../../../contexts/settingsContext/SettingsContext';
export default function FilteringSection() {
    const { filteringTags, addFilteringTag, deleteFilteringTag } =
        useContext(SettingsContext);
    const [filteringVersion1, setFilteringVersion1] = useState(true);
    const [numOfFilteringTags, setNumOfFilteringTags] = useState(
        filteringTags.length
    );
    return (
        <div className="email" id="section">
            <div className="sub-section-left">
                <h3>Filtering</h3>
            </div>
            <div className="wrapper">
                <div
                    className="sub-section-right"
                    style={{ marginBottom: '20px' }}
                >
                    {setFilteringVersion1 && (
                        <>
                            {numOfFilteringTags === 0 && (
                                <p className="email">
                                    You are not filtering any tags
                                </p>
                            )}
                            {numOfFilteringTags > 0 && filteringVersion1 && (
                                <ul class="filtering-list">
                                    {filteringTags.map((tag, index) => (
                                        <li
                                            className="filtering-item"
                                            key={index}
                                        >
                                            <button type="button">{tag}</button>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <button
                                className="edit"
                                onClick={() => setFilteringVersion1(false)}
                            >
                                <svg
                                    viewBox="0 0 17.6 17.6"
                                    width="16"
                                    height="16"
                                    fill="rgba(var(--black), 0.40)"
                                >
                                    <path d="M5.3 13.8l-2.1.7.7-2.1L10.3 6l1.4 1.4-6.4 6.4zm6.4-9.3l-1.4-1.4-1.4 1.4-6.7 6.7-.2.5-2 5.9 3.8-1.3 2.1-.7.4-.1.3-.3 7.8-7.8c.1 0-2.7-2.9-2.7-2.9zm5.6-1.4L14.5.3c-.4-.4-1-.4-1.4 0l-1.4 1.4L15.9 6l1.4-1.4c.4-.5.4-1.1 0-1.5"></path>
                                </svg>
                            </button>
                        </>
                    )}
                    {!setFilteringVersion1 && <>
                   

                    
                    
                    
                    
                    
                    
                    
                    
                    </>}
                </div>
                <br />
                {/* <div className="sub-section-right">
                    <p className="email">
                        You are not filtering any post content
                    </p>
                    <button className="edit">
                        <svg
                            viewBox="0 0 17.6 17.6"
                            width="16"
                            height="16"
                            fill="rgba(var(--black), 0.40)"
                        >
                            <path d="M5.3 13.8l-2.1.7.7-2.1L10.3 6l1.4 1.4-6.4 6.4zm6.4-9.3l-1.4-1.4-1.4 1.4-6.7 6.7-.2.5-2 5.9 3.8-1.3 2.1-.7.4-.1.3-.3 7.8-7.8c.1 0-2.7-2.9-2.7-2.9zm5.6-1.4L14.5.3c-.4-.4-1-.4-1.4 0l-1.4 1.4L15.9 6l1.4-1.4c.4-.5.4-1.1 0-1.5"></path>
                        </svg>
                    </button>
                </div> */}
            </div>
        </div>
    );
}