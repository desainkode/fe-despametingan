import { HeroSection } from './home/components/HeroSection'
import { DemografiSection } from './home/components/DemografiSection'
import { APBDesSection } from './home/components/APBDesSection'
import { LeadershipSection } from './home/components/LeadershipSection'
import { StrukturSection } from './home/components/StrukturSection'
import { NewsSection } from './home/components/NewsSection'

import {
  heroContent,
  demografiContent,
  apbdesContent,
  leadershipContent,
  strukturContent,
  newsContent,
} from './home/config/home-content'

export default function Home() {
  return (
    <>
      <HeroSection {...heroContent} />
      <DemografiSection {...demografiContent} />
      <APBDesSection {...apbdesContent} />
      <LeadershipSection {...leadershipContent} />
      <StrukturSection {...strukturContent} />
      <NewsSection {...newsContent} />
    </>
  )
}
