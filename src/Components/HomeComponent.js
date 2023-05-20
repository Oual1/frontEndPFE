import React from 'react'
import NavBar from './global/NavBar';
import Footer from './global/Footer';
import Image from '../source/images/image.PNG';
import ca from '../source/images/ca.PNG';
import generaliste from '../source/images/generaliste.PNG';
import dentiste from '../source/images/dentiste.PNG';
import image4 from '../source/images/image4.PNG';
import image1 from '../source/images/image1.PNG';
import image2 from '../source/images/image2.PNG';
import image3 from '../source/images/image3.PNG';
import kine from '../source/images/kine.PNG';
import oph from '../source/images/oph.PNG';
import maison from '../source/images/maison.PNG';
import infermiere from '../source/images/infermiere.PNG';
import contacter from '../source/images/contacter.PNG';

function HomeComponent() {
  return (
    <div className="App" style={{marginTop:"8%"}}>
        
        <NavBar></NavBar>
        
       <section id="banner"> 
       
        <img src={Image} alt="easylo logo"/>
   
        
         
    </section>
      
  
    <section id="choose" >
        <div class="container ">
            <div class="choose">
                <div class="choose-text">
                    
                    <h1>CareConnect : un pont entre prestataires de soins et patients</h1>
                </div>
                <div class="line"></div>
                   
            
            <div class="row">
                <div class="col-md-3">
                    <div class="choose-img"> <img src={image4} alt=""/> </div>
                    <div class="protext"><h3>Dossier patient informatisé</h3></div> 
                    <p>
                    Gérez et stockez les données de vos patients dans des fichiers numériques sécurisés. Vous trouverez ainsi vos données à tout moment et où que vous soyez, et vous pourrez les partager aisément avec les patients et d’autres prestataires de soins.
                    </p>
                </div>

                <div class="col-md-3">
                    <div class="choose-img"> <img src={image1} alt=""/> </div>
                    <div class="protext"><h3>Entièrement connecté</h3></div> 
                    <p>
                    Vous connecter à partir de votre logiciel à tous les services eHealth, vos collègues, les hôpitaux, les plateformes santé et d’autres professionnels de la santé devient un jeu d’enfant.
                    </p>
                </div>

                <div class="col-md-3">
                    <div class="choose-img"> <img src={image2} alt=""/> </div>
                    <div class="protext"><h3>Plus qu'un simple logiciel</h3></div>
                    <p>
                    Du matériel aux agendas en ligne en passant par un télésecrétariat connecté. Chez Corilus, vous trouverez bien plus qu'un simple logiciel de cabinet. Vous disposerez ainsi de tous les outils nécessaires pour aider vos patients aussi efficacement que possible.
                    </p>
                </div>

                <div class="col-md-3">
                    <div class="choose-img"> <img src={image3} alt=""/> </div>
                    <div class="protext"><h3>Un soutien optimal</h3></div>
                    <p>
                    Notre équipe de support au client, nos formateurs et autres experts vous conseillent et vous assistent, et suivent de près les derniers développements eHealth. Vous pouvez ainsi vous concentrer sur ce qui compte vraiment : soigner vos patients.
                    </p>
                </div>
            </div>
        </div>
        </div>
    </section>
    <section id="Get-loan">
       
            <div class="container">
                <div class="row">
                    <div class="col-md-3">
                       
                       
                    </div>
                    <div class="col-md-6">
                        <div class="choose-img">
                            <img src={ca} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
      
    </section>
   
    <section id="news">
        <div class="container">
            <div class="news">
                <h3>Latest News</h3>
                <div class="line"></div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="img"><img src={dentiste} alt=""/></div>
                      
                        <p class="mx-3">CareConnect Dentist remplit le rôle d'assistant numérique dans votre cabinet dentaire et intègre toutes les fonctionnalités de la santé en ligne d'une manière intelligente et conviviale.</p>
                    </div>
                    <div class="col-md-4">
                        <div class="img"><img src={generaliste} alt=""/></div>
                       
                        <p class="mx-3">Via eAgreement, vous pouvez facilement suivre en ligne vos demandes de remboursement auprès des mutualités. La facturation se fait également facilement par voie numérique via eFact.</p>
                    </div>
                    <div class="col-md-4">
                        <div class="img"><img src={kine} alt=""/></div>
                       
                        <p class="mx-3">Notre logiciel a été développé sur la base d'années d'expérience et d'une étroite collaboration avec vos collègues kinésithérapeutes. Il est donc parfaitement adapté à vos besoins.</p>
                    </div>
                    <div class="col-md-4">
                        <div class="img"><img src={oph} alt=""/></div>
                       
                        <p class="mx-3">CareConnect Ophtalmologist vous offre un soutien optimal pour le suivi de vos patients et de votre administration. Le logiciel contient des modules intelligents notamment pour la gestion de votre agenda et votre facturation.</p>
                    </div>
                    <div class="col-md-4">
                        <div class="img"><img src={maison} alt=""/></div>
                       
                        <p class="mx-3">De l'administration aux soins : CareConnect into.care simplifie la coopération entre tous les intervenants à l'intérieur et à l'extérieur de votre maison de soins.</p>
                    </div>
                    <div class="col-md-4">
                        <div class="img"><img src={infermiere} alt=""/></div>
                    
                        <p class="mx-3">CareConnect Nurse est le logiciel pour prestataires de soins infirmiers à domicile qui souhaitent être connectés rapidement et en toute sécurité avec les patients, les autres prestataires de soins et toutes les personnes concernées.</p>
                    </div>
                </div>
            </div>
        </div>
        <img src={contacter} alt="easylo logo"/>
    </section>
    <Footer></Footer>
   </div>
  
       
  
       
  );
}

export default HomeComponent