import Beams from "./reactBits/Beams";
import Nav from "./components/Nav";
import Mainroutes from "./routes/Mainroutes";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { asynccurrentuser } from "./features/actions/userAction";
import { useEffect } from "react";
import { asyncloadproducts } from "./features/actions/productAction";
const App = () => {
  const { user } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        !user && dispatch(asynccurrentuser());
    }, [user]);

    useEffect(() => {
        dispatch(asyncloadproducts());
    }, []);
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <Nav/>
      <Mainroutes/>
      <Beams
        className='fixed w-full h-full top-0 left-0'
        beamWidth={2}
        beamHeight={15}
        beamNumber={15}
        lightColor="#ffffff"
        speed={2}
        noiseIntensity={1.75}
        scale={0.2}
        rotation={30}
      />
    </div>
  );
};

export default App;
