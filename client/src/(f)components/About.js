import React from 'react';
import Layout from '../(f)components/Layout';
import '../regularpage.css';

class About extends React.Component {
    state = {
       // pour gérer FR/EN
    };

  render() {  
    return (
        <Layout history={this.props.history}>
            <span className="page-title">What's the deal here?</span>
            
            <p><span role="img" aria-label="french">🇫🇷</span> <b><span style={{color: "#000"}}>Pop! Goes the Music</span></b> est né tout simplement de la passion d’une journaliste pour la musique. La même journaliste qui écrit ces mots et trouve cela un peu étrange de rédiger la présentation de son site à la troisième personne sans pouvoir s’en empêcher. Quand on prend l’habitude de raconter le monde qui nous entoure sans se mettre en avant, on a du mal à en sortir et à assumer d’écrire à la première personne. Mais elle va essayer. Je vais essayer.</p>

            <p>Je m’appelle Ahlem, j’exerce le métier de journaliste (en tant qu’adulte diplômée) depuis 2017. La musique a toujours été mon meilleur compagnon dans la vie. J’aime écouter <i>obsessively</i> le même album pendant des jours autant que découvrir de nouveaux artistes, et j’adore partager cet amour. Alors je me suis dit : pourquoi ne pas canaliser tout cela dans un projet ?</p>

            <p>Sur PGTM, j’ai décidé de ne pas me mettre de contrainte de genre musical, cette barrière-là, les médias la posent assez, même si elle peut être floue et ne veut plus rien dire, parfois. Le clin d’oeil à la pop dans le titre est fait exprès, parce qu’en fin de compte, on peut qualifier beaucoup de choses de « pop ». Et puis, le mépris qu’il peut y avoir contre la pop ? Pas ici. Chaque chanson a le mérite d’être écoutée, sans préjugés fondés sur la popularité d’un artiste.</p>

            <p>Je ne vais pas m’étaler plus, en bref, ce que je vous promets ici : des recommandations musicales, des rencontres avec des artistes, des récaps de concerts, et puis de la bonne humeur et de l’honnêteté (un fondamental pour moi, quand on est journaliste), toujours.</p>
            
            <div className="separator"></div>

            <p><span role="img" aria-label="english">🇬🇧</span> <b><span style={{color: "#000"}}>Pop! Goes the Music</span></b> is the fruit of a journalist’s love of music. In the French intro, I talk about how it is quite difficult for the journalist that I am to write in first person. I manage to do so, but that is not an issue for me in English as I have never really had to do any professional journalistic writing in this language before. To my dismay.</p>

            <p>No matter. Hello, I am Ahlem. As I have mentioned a couple of times, I am a journalist. I have been working officially (you know, as a graduate, after putting a lot of my mom’s hard-earned money towards an education) since 2017. I have mostly worked on hot news, but I did have the opportunity to write about some artists I love recently and it made me think – <i>"Hey, maybe I can actually share my love for music other than by making music recs on Instagram?"</i></p>

            <p>So here it is. My website. This won’t be an exhaustive source of music-related news, far from it. I am only but one person, doing this all on my own, and with a job to be able to make a living. I will talk about music, obviously, without constraining myself with one genre. No judging, either.</p>

            <p>There will be articles about big artists that I will never meet for an interview in a million years, and about newer ones. On here, I will share recommendations, gig recaps, reviews, hopefully talks with cool people putting out some great tunes. I might do more, I might do less, who knows! Hopefully, I will have the energy to do both a French and English version of pieces (not literal translation, but actual separate writing, like these intros). Anyway, I can promise you passion, good vibes and honesty, always, if you choose to stick with me. And I hope you do.</p>
        
        </Layout>
    );
  }
}
  
export default About;