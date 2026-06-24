const header = document.querySelector('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 60);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();



// ==================
// SLIDER DE IMÁGENES 
// ==================
function initEmbla() {
  const emblaNode = document.querySelector(".embla");
  if (!emblaNode) return;

  let emblaApi = null;
  const mediaQuery = window.matchMedia("(max-width: 900px)");

  function toggleEmbla(e) {
    if (e.matches) {
      if (!emblaApi) {
        const autoplay = EmblaCarouselAutoplay({ delay: 3000, stopOnInteraction: false });

        emblaApi = EmblaCarousel(emblaNode, {
          loop: true,
          align: "center",
          watchDrag: false,
        }, [autoplay]);

        const slides = emblaNode.querySelectorAll(".embla__slide");

        const updateSelected = () => {
          const selectedIndex = emblaApi.selectedScrollSnap();
          slides.forEach((slide, index) => {
            slide.classList.toggle("is-selected", index === selectedIndex);
          });
        };

        emblaApi.on("select", updateSelected);
        emblaApi.on("reInit", updateSelected);
        updateSelected();
      }
    } else {
      if (emblaApi) {
        emblaApi.destroy();
        emblaApi = null;
      }
    }
  }

  toggleEmbla(mediaQuery);
  mediaQuery.addEventListener("change", toggleEmbla);
}

initEmbla();