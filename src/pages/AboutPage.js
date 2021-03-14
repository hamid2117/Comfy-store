import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  return (
    <main>
      <PageHero title='About' />
      <Wrapper className='section page section-center '>
        <img src={aboutImg} alt='img' />
        <article>
          <div className='title'>
            <h2>Our story</h2>
          </div>
          <div className='underline'></div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            ipsa alias consequuntur exercitationem voluptate pariatur aliquid
            autem magnam mollitia cumque, aspernatur facere excepturi
            necessitatibus fugiat quod accusamus numquam quae error. Deserunt
            saepe eaque vero modi! Quo quidem nesciunt dicta alias. Nihil quia
            illum consectetur corrupti.
          </p>
        </article>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
