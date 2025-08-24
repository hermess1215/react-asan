import $ from "jquery";
import { useEffect } from 'react';
import './Error.css'

const Error = () => {
  useEffect(() => {
    // requestAnimationFrame polyfill
    (function () {
      var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
      window.requestAnimationFrame = requestAnimationFrame;
    })();

    const canvas = document.getElementById("canvas-404");
    if (!canvas) return;

    let loading = true;
    let parts = [];
    const minSpawnTime = 100;
    let lastTime = new Date().getTime();
    const maxLifeTime = Math.min(
      6000,
      (canvas.height / (1.5 * 60)) * 1000
    );
    const emitterX = canvas.width / 2 - 50;
    const emitterY = canvas.height - 10;
    const smokeImage = new Image();

    setTimeout(() => {
      $(".js-toaster_lever").delay(200).animate({ top: 30 }, 100);
      $(".js-toaster_toast")
        .removeClass("js-ag-hide")
        .addClass("js-ag-animated js-ag-bounce-in-up");
    }, 800);

    const ctx = canvas.getContext("2d");
    canvas.height = 210;
    canvas.width = 300;

    function smoke(x, y) {
      this.x = x;
      this.y = y;
      this.size = 1;
      this.startSize = 60;
      this.endSize = 69;
      this.angle = Math.random() * 359;
      this.startLife = new Date().getTime();
      this.lifeTime = 0;
      this.velY = -1 - Math.random() * 0.5;
      this.velX = Math.floor(Math.random() * -6 + 3) / 10;
    }

    smoke.prototype.update = function () {
      this.lifeTime = new Date().getTime() - this.startLife;
      this.angle += 0.2;
      const lifePerc = (this.lifeTime / maxLifeTime) * 100;
      this.size =
        this.startSize +
        ((this.endSize - this.startSize) * lifePerc * 0.1);
      this.alpha = 1 - lifePerc * 0.01;
      this.alpha = Math.max(this.alpha, 0);
      this.x += this.velX;
      this.y += this.velY;
    };

    function spawn() {
      if (new Date().getTime() > lastTime + minSpawnTime) {
        lastTime = new Date().getTime();
        parts.push(new smoke(emitterX, emitterY));
      }
    }

    function render() {
      if (loading) {
        load();
        return;
      }
      let len = parts.length;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      while (len--)
        if (parts[len].y < 0 || parts[len].lifeTime > maxLifeTime) {
          parts.splice(len, 1);
        } else {
          parts[len].update();
          ctx.save();
          const offsetX = -parts[len].size / 2,
            offsetY = -parts[len].size / 2;
          ctx.translate(parts[len].x - offsetX, parts[len].y - offsetY);
          ctx.rotate((parts[len].angle / 180) * Math.PI);
          ctx.globalAlpha = parts[len].alpha;
          ctx.drawImage(
            smokeImage,
            offsetX,
            offsetY,
            parts[len].size,
            parts[len].size
          );
          ctx.restore();
        }
      spawn();
      requestAnimationFrame(render);
    }

    function load() {
      if (loading) {
        setTimeout(load, 3000);
      } else {
        render();
      }
    }

    smokeImage.src = document.getElementsByTagName("img")[0].src;
    smokeImage.onload = () => {
      loading = false;
    };

    render();
  }, []);

    return (
      <>
        <div className='ag-page-404'>
          <div className='ag-toaster-wrap'>
            <div className='ag-toaster'>
              <div className='ag-toaster_back'></div>
              <div className='ag-toaster_front'>
                <div className='js-toaster_lever ag-toaster_lever'></div>
              </div>
              <div className='ag-toaster_toast-handler'>
                <div className='ag-toaster_shadow'></div>
                <div className='js-toaster_toast ag-toaster_toast js-ag-hide'></div>
              </div>
            </div>

            <canvas id='canvas-404' className='ag-canvas-404'></canvas>
            <img className='ag-canvas-404_img' src='https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/404-error-smoke-from-toaster/images/smoke.png' alt='토스트'></img>
          </div>
        </div>
      </>
    );
  }

export default Error
