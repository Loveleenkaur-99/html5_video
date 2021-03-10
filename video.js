window.onload=function(){
    const player = document.querySelector('.player');
    const video = document.querySelector('.viewer');
    const progress = document.querySelector('.progress');
    const progressBar = document.querySelector('.progress_filled');
    const toggle = document.querySelector('.toggle');
    const skipButtons = document.querySelectorAll('[data-skip]');
    const ranges = document.querySelectorAll('.player_slider');
    //console.log('hello');
    function togglePlay(){
        const method = video.paused ? 'play' : 'pause';
        video[method]();
    }
    function updateButton(){
        const icon = this.paused ? '▶' : '⏸';
        console.log(icon);
        toggle.textContent = icon;
    }
    function skip(){
      //console.log(this.data.skip);
      video.currentTime += parseFloat(this.dataset.skip);
     }
     function handleRangeUpdate(){
        video[this.name]=this.value;
    }
    function handleProgress(){
        const precent= (video.currentTime / video.duration) * 100;
        progressBar.style.flexBasis = '${precent}%';
    }
    function scrub(e){
        const scrubTime= (e.offsetX/ progress.offsetwidth) * video.duration;
        video.currentTime = scrubTime;
    }
video.addEventListener('click' , togglePlay);
video.addEventListener('play' , updateButton);
video.addEventListener('pause' , updateButton);
video.addEventListener('timeUpdate' , handleProgress);

toggle.addEventListener('click' , togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change',  handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove' , () => mousedown && scrub(e));
progress.addEventListener('mousedown' , () => mousedown = true);
progress.addEventListener('mouseup' , () => mousedown = false);
}