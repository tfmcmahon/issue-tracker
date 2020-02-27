import React from 'react'

function Footer() {
    return (
        <div className="footer">
            <a class='footerLink' href='mailto:tfmcmahon@gmail.com'>tfmcmahon@gmail.com</a>
            <ul class='socialList'>
                <li class='socialListItem'>
                    <a 
                        class='socialListLink' 
                        href='https://www.linkedin.com/in/tfmcmahon/'
                        rel='noopener' 
                        target='_blank'
                    >
                        <i class="fab fa-linkedin"></i>
                    </a>
                </li>

                <li class='socialListItem'>
                    <a 
                        class='socialListLink' 
                        href='https://github.com/tfmcmahon'
                        rel='noopener' 
                        target='_blank'
                    >
                        <i class="fab fa-github-square"></i>
                    </a>
                </li>

                <li class='socialListItem'>
                    <a 
                        class='socialListLink' 
                        href='https://codepen.io/tfmcmahon'
                        rel='noopener' 
                        target='_blank'
                    >
                        <i class="fab fa-codepen"></i>
                    </a>
                </li>

                <li class='socialListItem'>
                    <a 
                        class='socialListLink'
                        href='https://glitch.com/@tfmcmahon'
                        rel='noopener' 
                        target='_blank'
                    >
                        <i class="fas fa-fish"></i>
                    </a>
                </li>
            </ul>
        </div> 
    )
}

export default Footer