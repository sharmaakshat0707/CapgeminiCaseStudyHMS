import React,{useEffect} from 'react'
import '../css/CardSlider.css';
import { gsap } from 'gsap';
import Bhopal1 from '../assets/Bhopal/Bhopal1.jpg';
import Bhopal2 from '../assets/Bhopal/Bhopal2.jpg';
import Bhopal3 from '../assets/Bhopal/Bhopal3.jpg';


const CardSlider = () => {

    useEffect(() => {
        const divs = document.querySelectorAll(".testimonials")
        gsap.set(divs[1] , {x:100 , opacity:1});

        gsap.timeline({repeat: -1 , defaults:{duration:5}}).add("one").to(divs[0] , {y:600 , x:0 , opacity: 0.05} , "one")
        .to(divs[1] , {y:-350 , x:0 , opacity: 0.5} , "one")
        .to(divs[2] , {y:-450 , x:100 , opacity: 1} , "one")

        .add("two")
        .to(divs[0] , {y:300 , x:100 , opacity: 1} , "two")
        .to(divs[1] , {y:300 , x:100 , opacity: 0.5} , "two")
        .to(divs[2] , {y:-600 , x:100 , opacity: 0.05} , "two")


        .add("three")
        .to(divs[0] , {y:0 , x:0 , opacity: 0.5} , "three")
        .to(divs[1] , {y:0 , x:100 , opacity: 1} , "three")
        .to(divs[2] , {y:0 , x:0 , opacity: 0.5} , "three")

        // .add("four")
        // .to(divs[0] , {y:200 , x:0 , opacity: 0.05} , "four")
        // .to(divs[1] , {y:0 , x:100 , opacity: 1} , "four")
        // .to(divs[2] , {y:-200 , x:0 , opacity: 0.05} , "four")



    })
  return (
    <div>
     <h1 style={{marginLeft:"630px"}}>Bhopal Attraction</h1>
      <div className="styles-content">
         <div className="testimonials">
            <div className="styles-container">
                <div>
                    <img src={Bhopal2} alt="" className='styles-img'/>
                </div>
                <div className="styles-text">
                    <h2>
                        Birla Mandir
                    </h2>
                    <p>Set a top the striking Arera Hills, the famous Lakshmi Narayan Temple was built as a tribute to the Hindu Goddess of wealth, Lakshmi, and her consort Lord Vishnu. Besides the beautiful idols of Lakshmi and Vishnu, the temple also houses a reclining idol of Lord Shiva with his wife Goddess Parvati.</p>
                </div>
            </div>
         </div>
         {/* .................... */}
         <div className="testimonials">
            <div className="styles-container">
                <div>
                    <img src= {Bhopal3} alt="" className='styles-img'/>
                </div>
                <div className="styles-text">
                    <h2>
                        Sanchi Stupa
                    </h2>
                    <p>One of the most unbeatable places to visit in Bhopal, and possibly in entire India, the magnificence of the Sanchi Stupa remains unmatched till date. Believed to have originated in the 3rd century BCE, the building was built it the reign of the great emperor Ashoka of the Maurya Dynasty and is one of the most remarkable Buddhist monuments in the country.</p>
                </div>
            </div>
         </div>
         <div className="testimonials">
            <div className="styles-container">
                <div>
                    <img src={Bhopal1} alt="" className='styles-img'/>
                </div>
                <div className="styles-text">
                    <h2>
                        Bhojpur Temple
                    </h2>
                    <p>Another stunning heritage built by Raja Bhoj in the 11th century, the Bhojpur Temple is a religious tribute to the Hindu God Shiva, nestled in the rustic village of Bhojpur in Madhya Pradesh.</p>
                </div>
            </div>
         </div>
      </div>
    </div>
  )
}

export default CardSlider