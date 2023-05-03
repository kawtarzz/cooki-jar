export const HomePage = () => {
const localcookiJarUser = localStorage.getItem("cookijar_user")
const cookijarUserObject = JSON.parse(localcookiJarUser)
    return (
        <div id="welcome">
            <h3 className="task">Welcome back, {cookijarUserObject.name}!</h3></div>)}
