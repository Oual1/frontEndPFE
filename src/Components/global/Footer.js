import React from 'react';
import Capture from '../../source/images/Capture.PNG';
import send2 from '../../source/images/send2.PNG';



function Footer() {
    return (
        <section id="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="easylo-img">
                        <img src={Capture} alt=""/>
                    </div>
                    <div class="socials">
                    <p class="easy-para">Suivez-nous</p>
                            <a href="www.fb.com"> <i class="fab fa-facebook"></i> </a>
                            <a href="https:/www.instagram.com"> <i class="fab fa-instagram"></i> </a>
                            <a href="https:/www.linkedln.com"> <i class="fab fa-linkedin-in"></i> </a>
                            <a href="https:/www.youtube.com"> <i class="fab fa-youtube"></i> </a>
                        </div>
                  
                </div>
                <div class="col-md-2">
                    <h5>Quick Links</h5>
                    <div class="links-footer d-grid">
                    



                        <p><a href="">CONDITIONS GÉNÉRALES</a></p>
                        <p><a href="">PRIVACY POLICY</a></p> 
                        <p><a href="">DISCLAIMER</a></p> 
                        <p><a href="">BLOG</a></p>
                    </div>   
                </div>
                <div class="col-md-2">
                    <h5>Contact</h5>
                    <div class="links-footer d-grid">
                        <p><a href="">Corilus sa</a></p>
                        <p><a href="">Rue Camille Hubert 23
5032 Les Isnes </a></p> 
                        <p><a href="">+32 (0)81 77 99 30</a></p> 
                        <p><a href=""> information@corilus.be</a></p>
                    </div>   
                </div>

                <div class="col-md-4">
                    <h5>Vous voulez en savoir plus ?</h5>
                    <div class="d-grid">
                        <p>Nous nous ferons un plaisir de vous faire une démonstration personnalisée de nos produits.</p>
                    </div> 
                    <div class="form">
                        <form action="">
                            <input type="email" name="" id="" placeholder=" Enter Your Email"/>
                            <button type="submit"><img class="img-submt" src={send2} alt="send button"/></button>       
                        </form>
                       
                    </div>  
                </div>
            </div>
            <div class="line"></div>
            
        </div>
    </section>
    );
  }

export default Footer;