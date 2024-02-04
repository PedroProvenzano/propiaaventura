const Scenes = {
  DomScene: document.getElementsByClassName("DOMScene")[0],
  DomChoose: document.getElementById("background"),
};
const Buttons = document.getElementsByClassName("opcion");
const Intro = document.getElementById("intro");
const Matufia = document.getElementById("matufia");
const Sobre = document.getElementById("sobre");
const CBU = document.getElementById("cbu");
const ContenedorOpcion = document.getElementById("contenedor-opcion");
Intro.classList.toggle("fade");

// Variables background videoID textContent
const ScenesData = [
  {
    background: "url(./assets/background/1.png)",
    videoID: "6YF6zYSSMbg",
    textContent: "Esperaba encontrarme con ésta persona.",
  },
  {
    background: "url(./assets/background/2.png)",
    videoID: "iV2-Lj3gX8I",
    textContent: "ESCUCHAR",
  },
  {
    background: "url(./assets/background/3.png)",
    videoID: "d69T2gqYQGs",
    textContent: "YA AGARRE ALGO PARA ANOTAR",
  },
  {
    background: "url(./assets/background/4.png)",
    videoID: "P3jNnWfX0Ww",
    textContent: "CONTINUAR",
  },
  {
    background: "url(./assets/background/5.png)",
    videoID: "O9i94NwMQaY",
    textContent: "CONTINUAR",
  },
  {
    background: "url(./assets/background/6.png)",
    videoID: "_F8DZ4wLisM",
    textContent: "CONTINUAR",
  },
  {
    background: "url(./assets/background/7.jpg)",
    videoID: "lBbMN1x-hX0",
    textContent: "CONTINUAR",
  },
  {
    background: "url(./assets/background/8.jpg)",
    videoID: "rAw0Q0tyrmY",
    textContent: "CONTINUAR",
  },
  {
    background: "url(./assets/background/9.jpg)",
    videoID: "08bioEKW5NE",
    textContent: "VOLVER A LA PREGUNTA",
  },
  {
    background: "url(./assets/background/9.jpg)",
    videoID: "08bioEKW5NE",
    textContent: "CONTINUAR AL CUESTIONARIO",
  },
];
const formLink =
  "https://docs.google.com/forms/d/1CabQ4_XSAeXbnUoCwPGOeaaDlLwsOxYmxJBV0JRm5pQ/edit?usp=drivesdk";
let STATE = 0;
let isVideo = true;
let Player;
let tryAgain = false;

// Events for buttons
Buttons[0].addEventListener("click", () => {
  if (STATE === 9) {
    window.open(
      "https://docs.google.com/forms/d/1CabQ4_XSAeXbnUoCwPGOeaaDlLwsOxYmxJBV0JRm5pQ/viewform?edit_requested=true",
      "_blank"
    );
  } else {
    if (STATE !== 8) {
      STATE++;
    } else {
      STATE = 1;
      tryAgain = true;
    }
    if (STATE === 7) {
      CBU.style.display = "none";
    }
    changeScene();
    if (tryAgain) {
      setButtons();
      setBackground();
      tryAgain = false;
    } else {
      Player = new YT.Player("Player", {
        width: "640",
        height: "390",
        videoId: ScenesData[STATE].videoID,
        playerVars: {
          controls: 0,
          disablekb: 1,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    }
  }
});
Buttons[1].addEventListener("click", () => {
  STATE = 8;
  changeScene();
  Player = new YT.Player("Player", {
    width: "640",
    height: "390",
    videoId: ScenesData[STATE].videoID,
    playerVars: {
      controls: 0,
      disablekb: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
});
// Se ejecuta cuando termina un video
function setScene() {
  setBackground();
  setButtons();
  changeScene();
}
// Se ejecutan dentro del setScene
// Done - Test Pending
function setButtons() {
  if (STATE === 1) {
    // Un solo boton
    Buttons[0].innerHTML = ScenesData[STATE].textContent;
    Buttons[0].style.display = "flex";
    Buttons[1].style.display = "flex";
  } else {
    // Dos botones
    Buttons[0].innerHTML = ScenesData[STATE].textContent;
    Buttons[0].style.display = "flex";
    Buttons[1].style.display = "none";
  }
}
// Done - Test Pending
function setBackground() {
  Scenes["DomChoose"].style.backgroundImage = ScenesData[STATE].background;
}
// Done - Test Pending
function changeScene() {
  if (STATE !== 0) Matufia.style.display = "none";
  // Desaparecer img
  if (tryAgain) {
    isVideo = false;
  } else {
    if (isVideo) {
      //Animation Choose
      Scenes["DomScene"].style.display = "none";
      Scenes["DomChoose"].style.display = "flex";
    } else {
      //Animation Scene
      Scenes["DomChoose"].style.display = "none";
      Scenes["DomScene"].style.display = "block";
    }
    isVideo = !isVideo;
  }
}

// Animation
function startFadeout() {
  setTimeout(() => {
    setTimeout(() => {
      document.getElementById("Player").style.display = "block";
      Intro.style.display = "none";
      Player.playVideo();
    }, 1000 * 0.5);
    Intro.classList.toggle("fade");
  }, 1000 * 1);
}
document.getElementById("intro-comenzar").addEventListener("click", () => {
  startFadeout();
  Player = new YT.Player("Player", {
    width: "640",
    height: "390",
    videoId: ScenesData[STATE].videoID,
    playerVars: {
      controls: 0,
      disablekb: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
});
// Creation of the first video
function onYouTubePlayerAPIReady() {
  //
}
// autoplay video
function onPlayerReady(event) {
  event.target.setPlaybackQuality("hd720");
  event.target.playVideo();
}
// when video ends
function onPlayerStateChange(event) {
  if (event.data === 0) {
    if (STATE !== 7) {
      event.target.destroy();
      setScene();
      if (STATE === 5) {
        Sobre.style.display = "block";
        Scenes["DomChoose"].style.justifyContent = "space-between";
        ContenedorOpcion.style.paddingTop = "2rem";
      }
      if (STATE === 6) {
        CBU.style.display = "block";
      }
    } else {
      console.log("Evento final");
      STATE = 9;
      event.target.destroy();
      setScene();
    }
  }
}

Sobre.addEventListener("click", () => {
  open("https://pin.it/35Jjp4vzm", "_blank");
  Sobre.style.display = "none";
  Scenes["DomChoose"].style.justifyContent = "space-around";
  ContenedorOpcion.style.paddingTop = "0";
});
