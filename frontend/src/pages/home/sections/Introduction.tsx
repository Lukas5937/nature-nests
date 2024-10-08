import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

import Cabin from "../../../assets/home/Introduction.svg"

export default function Introduction() {
  const scrollRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  })

  const moveUp = useTransform(scrollYProgress, [0, 0.7], [50, 0])

  return (
    <section ref={scrollRef} className="relative bg-darkGreen py-16">
      <div className="mx-auto grid w-11/12 max-w-screen-xl gap-16 px-4 md:grid-cols-2">
        <div className="flex items-center justify-center">
          <img
            className="h-auto w-64 sm:w-80"
            src={Cabin}
            alt="Cabin surrounded by trees"
          />
        </div>
        <motion.div style={{ y: moveUp }}>
          <h2 className="text-center font-serif text-3xl text-light sm:text-4xl md:text-start">
            Your gateway to nature&apos;s wonders
          </h2>
          <p className="mt-6 leading-7 text-light">
            Discover your perfect retreat nestled in the heart of nature. At
            NatureNests, we offer a curated selection of unique cabins designed
            for adventure enthusiasts and nature lovers alike. Our handpicked
            locations provide the ideal setting to escape from the hustle and
            bustle of everyday life and immerse yourself in the beauty of the
            great outdoors.
          </p>
          <p className="mt-4 leading-7 text-light">
            Whether you're seeking a cozy hideaway for a peaceful getaway or a
            rustic base for your next adventure, our cabins offer comfort and
            style in the midst of breathtaking landscapes. From serene forests
            to majestic mountains, each cabin is thoughtfully designed to
            enhance your experience and provide you with a memorable stay.
          </p>
          <p className="mt-4 leading-7 text-light">
            Join us on a journey to explore hidden gems and create unforgettable
            memories. Embrace the wild, unwind in luxury, and reconnect with
            nature in the most extraordinary way. Your adventure begins here.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
