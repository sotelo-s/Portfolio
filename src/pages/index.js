
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroLayout}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>
              PhD Student · Natural Language Processing
            </p>

            <Heading as="h1" className={styles.heroTitle}>
              Hi! I'm Sabrina Sotelo Penedo.
            </Heading>

            <p className={styles.heroSubtitle}>
              I am a researcher in Natural Language Processing,
              interested in social media analysis, artificial intelligence,
              and the intersection between language and society.
            </p>

            <div className={styles.buttons}>
              <Link className="button button--primary button--lg" to="/research">
                Explore my research
              </Link>

              <Link
                className="button button--outline button--primary button--lg"
                to="/contact">
                Get in touch
              </Link>
            </div>
          </div>

          <div className={styles.heroImageContainer}>
            <img
              src={useBaseUrl('/img/profile.png')}
              alt="Portrait"
              className={styles.heroImage}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function ResearchInterests() {
  const interests = [
    {
      title: 'Natural Language Processing',
      description:
        'Text analysis, classification, sentiment analysis, and emotion detection.',
    },
    {
      title: 'Social Media Analysis',
      description:
        'Understanding online discourse, user behaviour, and social phenomena through data.',
    },
    {
      title: 'Artificial Intelligence',
      description:
        'Machine learning, transformer architectures, large language models, and multimodal AI.',
    },
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2">Research Interests</Heading>

        <div className={styles.interestGrid}>
          {interests.map((interest) => (
            <div className={styles.interestCard} key={interest.title}>
              <Heading as="h3">{interest.title}</Heading>
              <p>{interest.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className={styles.aboutSection}>
      <div className="container">
        <div className={styles.aboutContent}>
          <div>
            <Heading as="h2">About Me</Heading>
            <p>
              With a background in Computer Engineering and Big Data,
              I am currently pursuing a PhD in Information Technology.
              My work focuses on applying computational methods and
              artificial intelligence to real-world language-related problems.
            </p>
            <Link to="/profile">More about me →</Link>
          </div>

          <div>
            <Heading as="h2">Explore</Heading>
            <ul>
              <li><Link to="/research">Research projects</Link></li>
              <li><Link to="/profile/education">Education</Link></li>
              <li><Link to="/profile/experience">Experience</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title="Home"
      description="Academic and research portfolio focused on Natural Language Processing and Artificial Intelligence."
    >
      <main>
        <HomepageHeader />
        <ResearchInterests />
        <AboutPreview />
      </main>
    </Layout>
  );
}
