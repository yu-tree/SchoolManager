'use strict';
const sidebar = document.getElementById('notification');
const imgicon = document.querySelectorAll('.side-bar-open-icon');
const imgblock = document.getElementById('notification-icon');

function openNav()
{
    sidebar.style.width ="200px";
    for (let i = 0; i < imgicon.length; i++)
        imgicon[i].src="static/css/img/close.png";
    imgblock.style.borderRadius="0px";
}
function closeNav()
{
    sidebar.style.width="30px";
    for (let i = 0; i < imgicon.length; i++)
        imgicon[i].src="static/css/img/open.png";
    imgblock.style.borderRadius= "0 20px 20px 0 / 0 20px 20px 0";
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