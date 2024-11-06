import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const Landing = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();

    const trumpAudio = new Audio("/sounds/eagle.mp3");
    const kamalaAudio = new Audio("/sounds/miau.mp3");

    trumpAudio.volume = 0.05;
    kamalaAudio.volume = 0.05;

    const playAudio = (audio: HTMLAudioElement) => {
      audio.currentTime = 0;
      audio.play().catch((error: any) => console.log("Error playing audio:", error));
    };

    const stopAudio = (audio: HTMLAudioElement) => {
      audio.pause();
      audio.currentTime = 0;
    };

    const handleMouseOver = (audio: HTMLAudioElement) => () => playAudio(audio);
    const handleMouseOut = (audio: HTMLAudioElement) => () => stopAudio(audio);

    const trumpImage = document.querySelector('img[alt="Donald Trump Image"]');
    const kamalaImage = document.querySelector(
      'img[alt="Kamala Harris Image"]'
    );

    const enableAudioPlayback = () => {
      if (audioContext.state === "suspended") {
        audioContext.resume().then(() => {
          if (trumpImage) {
            trumpImage.addEventListener(
              "mouseover",
              handleMouseOver(trumpAudio)
            );
            trumpImage.addEventListener("mouseout", handleMouseOut(trumpAudio));
          }

          if (kamalaImage) {
            kamalaImage.addEventListener(
              "mouseover",
              handleMouseOver(kamalaAudio)
            );
            kamalaImage.addEventListener(
              "mouseout",
              handleMouseOut(kamalaAudio)
            );
          }
        });
      }

      document.removeEventListener("click", enableAudioPlayback);
    };

    document.addEventListener("click", enableAudioPlayback);

    return () => {
      if (trumpImage) {
        trumpImage.removeEventListener(
          "mouseover",
          handleMouseOver(trumpAudio)
        );
        trumpImage.removeEventListener("mouseout", handleMouseOut(trumpAudio));
      }
      if (kamalaImage) {
        kamalaImage.removeEventListener(
          "mouseover",
          handleMouseOver(kamalaAudio)
        );
        kamalaImage.removeEventListener(
          "mouseout",
          handleMouseOut(kamalaAudio)
        );
      }
      document.removeEventListener("click", enableAudioPlayback);
    };
  }, []);

  return (
    <section className="relative z-0 flex items-center justify-center w-full h-screen overflow-hidden">
      <div className="flex flex-col w-full h-screen md:flex-row">
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-red-700 z-[1]"></div>
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-blue-700 z-[1]"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-full z-[10]">
        <img
          className="object-contain w-full h-auto transform translate-x-[20.5px]"
          src="/images/capitol.png"
          alt="Capitol Building"
        />
      </div>
      <div className="absolute top-0 right-0 w-full h-screen z-[20]">
        <div className="relative w-full h-full">
          <a
            href="https://pump.fun/2eUBVo6ZD26xZukES8jAFjcD6HUE4K3Ku4h68nbdpump"
            className="absolute bottom-0 left-0"
          >
            <img
              className="object-cover max-w-[1500px] transition-transform duration-300 ease-in-out hover:scale-110"
              src="/images/trump.png"
              alt="Donald Trump Image"
            />
          </a>
          <a
            href="https://pump.fun/2eUBVo6ZD26xZukES8jAFjcD6HUE4K3Ku4h68nbdpump"
            className="absolute -bottom-2 right-0"
          >
            <img
              className="object-cover w-[935px] transition-transform duration-300 ease-in-out hover:scale-110"
              src="/images/kamala.png"
              alt="Kamala Harris Image"
            />
          </a>
        </div>
      </div>
      <div className="absolute top-[10%] z-[20] w-fit h-fit flex flex-col justify-center items-center gap-6">
        <h1 className="font-bold text-center text-white uppercase text-8xl font-josefin">
          PEPE VOTE
        </h1>
        <p className="text-4xl font-bold text-center text-white uppercase font-josefin">
          Choose your PEPESIDENT!
        </p>
        <a href="https://x.com/PepeVoteToken" target="_blank">
          <img
            className="w-[35px] h-auto white-filter"
            src="/images/icons/x.svg"
            alt="X"
          />
        </a>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Welcome Modal"
        className="fixed inset-0 flex items-center justify-center z-[30]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg text-center font-josefin flex flex-col gap-4">
          <img className="w-24 h-auto mx-auto" src="/images/pepe.png" alt="Pepe Vote" />
          <h2 className="text-2xl font-bold mb-4 ">JOIN OUR PEPE VOTING!</h2>
          <p className="mb-6">Do you want to vote?</p>
          <button
        onClick={closeModal}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
          >
        Yes
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default Landing;