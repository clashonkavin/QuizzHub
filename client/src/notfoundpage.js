import Navbar from "./navbar";

const NotFound = () => {
   return ( <div >
            <Navbar/>
            <div className="notfoundpage">
                <h1 >404</h1>
                <h2>Page Not Found {":'("}</h2>
            </div>
    </div> );
}

export default NotFound;