import Loading from '../../assets/loading.gif';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
const LoadingScreen = () => {
    return (<div className = "flex flex-col w-full min-h-screen">
        <NavBar/>
        <div className = "flex flex-grow relative top-10 justify-center text-2xl pb-8">
          <img src = {Loading} alt = "Loading..." className = "h-10 w-auto"/>
        </div>
        <Footer/>
    </div>);
}

export default LoadingScreen;
