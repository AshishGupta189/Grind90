import Video from "../components/home/Video"
import HomeHeroBottom from "../components/home/HomeBottomText"
import HomeHeroText from "../components/home/HomeHeroText"
const Home = () => {
  return (
    <div>
      <div className="h-screen w-screen fixed">
        <Video />
      </div>

      <div className="w-screen h-screen relative overflow-hidden flex flex-col justify-between">
        <HomeHeroText />
        <HomeHeroBottom />
      </div>
    </div>
  )
}

export default Home
