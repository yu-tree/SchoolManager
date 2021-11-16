'use strict';
const sidebar = document.getElementById('notification');
const imgicon = document.getElementById('side-bar-open-icon');

function openNav()
{
    sidebar.style.width ="200px";
    sidebar.style.backgroundColor = "#a9beff";
    imgicon.src="src/close.png";
}
function closeNav()
{
    sidebar.style.width="30px";
    imgicon.src="src/open.png";
}
function changeNav()
{
    if (sidebar.classList.contains('closed'))
    {
        openNav();
        sidebar.classList.add('opened');
        sidebar.classList.remove('closed');
    }
    else if(sidebar.classList.contains('opened'))
    {
        closeNav();
        sidebar.classList.add('closed');
        sidebar.classList.remove('opened');
    }
}

