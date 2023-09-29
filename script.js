// const scroll = new LocomotiveScroll({
//     el: document.querySelector('.main'),
//     smooth: true
// });

function init() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });
    
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    

}
init();

// gsap.from(".page1 h1,.page1 h2", {
//     y: 10,
//     rotate: 10,
//     opacity: 0,
//     delay: 0.3,
//     duration: 0.7
// })

var crsr = document.querySelector(".cursor")
var main = document.querySelector(".main")
main.addEventListener("mousemove",function(dets){
    crsr.style.left = dets.x +"px"
    crsr.style.top = dets.y +"px"
})

var video = document.querySelectorAll('video');
video.forEach(function(elem) {
    elem.addEventListener("mouseenter", function(){
        crsr.innerHTML = 'Sound On';
        crsr.style.padding = '8px'
        crsr.style.width = '90px';
        crsr.style.height='30px'
        crsr.style.borderRadius = "30px";
    })
    
    elem.addEventListener("mouseleave", function(){
        crsr.innerHTML = '';
        crsr.style.width = '50px';
        crsr.style.height = '50px';
        crsr.style.borderRadius = '50%';
    })
})


var tl = gsap.timeline({
    scrollTrigger: {
        trigger:".page1 h1",
        scroller:".main",
        markers:true,
        start:'top 27%',
        end:"top 0",
        scrub:3,
     }
})


tl.to(".page1 h1", {
     x:-80,
     
},'anim')

tl.to('.page1 h2', {
    y:150,
    x:90,
    // color:"#ddff00"
},'anim')
tl.to('.page1 video', {
    width:"95%",
},'anim')

var tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        // markers:true,
        start: "top -50%",
        end: "top -120%",
        scrub: 3
    }
})
tl2.to(".main", {
    backgroundColor: "#fff",
    
},)

var tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        // markers:true,
        start: "top -420%",
        end: "top -450%",
        scrub: 3
    }
})

tl3.to(".main",{
    backgroundColor:"#0F0D0D"
},)


var boxes = document.querySelectorAll(".box")
boxes.forEach(function(elem){
    var att = elem.getAttribute("data-image");
    elem.addEventListener("mouseenter",function(){
        crsr.style.width = "480px"
        crsr.style.height = "370px"
        crsr.style.borderRadius = "0"
        crsr.style.backgroundImage = `url(${att})`
    })
    elem.addEventListener("mouseleave",function(){
        // elem.style.backgroundColor = "transparent"
        crsr.style.width = "50px"
        crsr.style.height = "50px"
        crsr.style.borderRadius = "50%"
        crsr.style.backgroundImage = `none`
    })
})
