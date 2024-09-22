import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
const Screen404 = () => {
    return (<div className = "flex flex-col w-full min-h-screen">
        <NavBar/>
        <div className = "flex flex-grow flex-col items-center relative top-10 text-2xl pb-8">
          <h1 className = "text-3xl m-10 font-semibold">404 - Page Not Found</h1>
          <h1 className = "text-xl">Sorry, this page doesn't exist.</h1>
        </div>
        <Footer/>
    </div>);
}

export default Screen404;
