<template>
  <div class="home-bg">
    <div class="header-bg">
      <div class="container text-white d-flex flex-column align-items-end pr-6 pt-10">
        <h2>Virtual Reality</h2>
        <p>全新技術．全新體驗</p>
        <p>讓你意想不到的新玩法</p>
      </div>
    </div>

    <div class="container my-6">
      <div class="d-flex justify-content-center pb-5 head-title">
        <h2 class="text-center text-white">熱門遊戲</h2>
      </div>
      <div class="row justify-content-center mx-sm-0 mx-1">
        <div
          class="col-md-5 border border-vrpink rounded p-0 game mr-md-4 mr-0 d-flex justify-content-center"
        >
          <img src="../assets/gameimg/skyfont.png" alt class="img-fluid" />
          <div class="game-more">
            <router-link class="btn btn btn-outline-vrblue text-white" to="/products">前往購買</router-link>
          </div>
        </div>
        <div class="col-md-5 my-md-0 my-2">
          <div class="row">
            <div class="col mr-4">
              <div class="row flex-column">
                <div
                  class="col border border-vrpink rounded p-0 game mb-3 d-flex flex-column justify-content-center"
                >
                  <img src="../assets/gameimg/rawdata.jpeg" alt class="img-fluid" />
                  <div class="game-more">
                    <router-link class="btn btn btn-outline-vrblue text-white" to="/products">前往購買</router-link>
                  </div>
                </div>
                <div
                  class="col border border-vrpink rounded p-0 game d-flex flex-column justify-content-center"
                >
                  <img src="../assets/gameimg/angrybird.png" alt class="img-fluid" />
                  <div class="game-more">
                    <router-link class="btn btn btn-outline-vrblue text-white" to="/products">前往購買</router-link>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="col border border-vrpink rounded p-0 game d-flex flex-column justify-content-center"
            >
              <img src="../assets/gameimg/Sparc.png" alt class="img-fluid" />
              <div class="game-more">
                <router-link class="btn btn btn-outline-vrblue text-white" to="/products">前往購買</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row py-5">
        <div class="col-md-6 text-white d-flex flex-column justify-content-center pl-md-7 pl-2">
          <h2 class="text-left">更多精彩遊戲</h2>
          <p>無與倫比的刺激，更真實的遊玩體驗，你還在等甚麼?</p>
          <router-link class="btn btn-vrpink w-25" to="/products">立即前往</router-link>
        </div>
        <div class="col-md-6 d-flex justify-content-center">
          <div id="carouselExampleControls" class="carousel slide my-4" data-ride="carousel">
            <div class="carousel-inner game-info">
              <div class="carousel-item active">
                <img src="../assets/gameimg/game-banner4.jpg" class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src="../assets/gameimg/game-banner2.jpg" class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src="../assets/gameimg/game-banner3.jpg" class="d-block w-100" alt="..." />
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleControls"
              role="button"
              data-slide="prev"
            >
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleControls"
              role="button"
              data-slide="next"
            >
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center pb-5 head-title">
        <h2 class="text-center text-white">限時優惠</h2>
      </div>
      <div class="row">
        <div class="col-lg-6 d-flex flex-column text-white pl-md-7 pl-2">
          <h3>現在最多人玩的遊戲:</h3>
          <hr />
          <p>立即購買最多人玩的遊戲，即可享有最高<span class="text-danger">1折</span>的優惠喔!!!</p>

          <p>
            結帳時，於優惠處輸入:
            <span class="text-danger">BeatSaberKing</span> 即可得到此優惠
          </p>
          <p>限時至年底!!要玩要快喔~</p>
          <router-link class="btn btn-vrpink my-2" to="/products">馬上搶購</router-link>
        </div>
        <div class="col-lg-6">
          <iframe
            width="100%"
            height="444"
            src="https://www.youtube.com/embed/gV1sw4lfwFw"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div class="d-flex justify-content-center pb-4 head-title">
        <h2 class="text-center text-white">VR頭戴顯示器</h2>
      </div>

      <div class="row py-4">
        <div class="col-md-4 d-flex justify-content-center my-md-0 my-2">
          <div class="card bg-dark text-white" style="width: 18rem; ">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSm8Ejwprrqmm05penaXuuAp3uV_2iB7dGq8ravGqewtkWZ3pOM&usqp=CAU"
              class="card-img-top head-img"
              alt="..."
            />
            <div class="card-body">
              <h3 class="my-2">Oculus Link</h3>
              <p class="card-text">打破裝置隔閡，盡享遊戲樂趣。您現在可以將 Oculus Quest 連結至相容的電腦，體驗眾多 Rift 內容和遊戲。</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 d-flex justify-content-center my-md-0 my-2">
          <div class="card bg-dark text-white" style="width: 18rem;">
            <img src="../assets/htcpro.png" class="card-img-top head-img" alt="..." />
            <div class="card-body">
              <h3 class="my-2">HTC VIVE PRO</h3>
              <p
                class="card-text"
              >為了滿足當前 VR 用戶的需求，VIVE Pro 是一款易於應用的 PC-VR 裝置，幫助您擴展您的業務，並為專業用戶提供最豐富的功能。從固定的場域進入無限擴展的虛擬實境、多人同時使用，VIVE Pro 提供最真實影像清淅度、強大的音效和身歷其境的體驗。</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 d-flex justify-content-center my-md-0 my-2">
          <div class="card bg-dark text-white" style="width: 18rem;">
            <img src="../assets/pico.png" class="card-img-top head-img" alt="..." />
            <div class="card-body">
              <h3 class="my-2">PICO G2</h3>
              <p
                class="card-text"
              >清晰度一直是虛擬現實最重要的標準，而持續進化的小怪獸系列VR一體機則是優秀VR視覺效果的標杆。 Pico G2 小怪獸2 4K版再次大幅提升了屏幕分辨率，用令人難以置信的銳利畫面，讓你隨時在影視、遊戲、VR互動社交中模糊真實與虛擬的界限。</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="game-esport d-flex align-items-center justify-content-center">
      <div class="game-esport-content text-white mx-md-0 mx-2">
        <h2>VR電競</h2>
        <p>全新商業模式，全新玩法，快點加入，成為這市場的第一波</p>
        <div > <a href="https://springboardvr.com/" class="btn btn-outline-vrblue" target="_blank" >立即加入</a></div>
      </div>

      <div class="game-esport-inner"></div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {};
  }
};
</script>




<style>
/*#09CFFF  #DC007B*/
.home-bg {
  background: url(../assets/background.jpg);
  background-size: cover;
  background-repeat: no-repeat;
}
.header-bg {
  background-image: url(../assets/banner1.jpg);
  background-size: cover;
  min-height: 650px;
}
@media (max-width: 992px) {
  .header-bg {
    min-height: 400px;
  }
}
@media (max-width: 375px) {
  .header-bg {
    min-height: 200px;
  }
}
.game {
  position: relative;
}
.game:hover {
  box-shadow: 0 0 0 2px #dc007b;
}
.game-more {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.3s;
  display: none;
  text-align: center;
}
.game-more a {
  text-decoration: none;
  transition: all 0.3s;
}
.game:hover .game-more {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(133, 133, 133, 0.747);
  top: 0%;
  left: 0;
}
.head-title h2 {
  border-left: 3px solid #dc007b;
  padding-left: 5px;
}
.head-img {
  height: 170px;
}
.game-esport {
  position: relative;
  min-height: 100vh !important;
}
.game-esport-content {
  z-index: 999;
}
.game-esport-inner {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-image: url(../assets/gameimg/game-esport.jpg);
}
</style>

