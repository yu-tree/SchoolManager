import Dashboard from  "./views/HomeDashboardView.js";
import Calender from "./views/MyCalenderView.js";
import School from "./views/SchoolManagerView.js";
import Error from "./views/error.js"

const navigateTo = url =>{
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    const routes = [
        {path : "/", view:Dashboard},
        {path : "/calender", view:Calender},
        {path : "/school_manager", view:School}
    ];

    //Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route:route,
            isMatch:location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    if (!match){
        match = {
            route : {path:"/error", view:Error},
            isMatch : true
        }
    }

    console.log(match);
    //Each view is class, so make object with new keyword
    const view = new match.route.view();
    document.querySelector('#main-pannel').innerHTML = await view.getHtml();
    view.attachEvent();
};

window.addEventListener('popstate',router);

document.addEventListener("DOMContentLoaded",()=>{
    document.body.addEventListener('click',e=>{
        if(e.target.matches("[data-link]")){
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    router();
});