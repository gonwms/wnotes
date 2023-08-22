# Framer Motion

## animate

It allow time line complex sequence

- at: '<', '-0.5' , '0.5'
- labels
- array of values: opacity: [0, 1] means from 0 to 1
  //https://codesandbox.io/s/framer-motion-sequencing-81ww2d?from-embed

```typescript
export default Component  ()  {
  const [scope, animate] = useAnimate();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const sequence = isActive
      ? [
          ["H2", { y: 0 }, { delay: 0.0 }],
          [
            "p",
            { x: -100, color: "yellow" },
            { delay: stagger(0.05, { from: "last" }), at: "<" },
          ],
          "my-label",
          [".icon", { x: 50 }, { at: "-0.5" }],
        ]
      : [
          ["H2", { y: 20 }, { delay: 0.0 }],
          ["p", { x: 0, color: "black" }],
          [".icon", { x: 0 }, { at: "-0.5" }],
        ];
    animate(sequence as any);
  }, [isActive]);

  return (
    <section ref={scope}>
      <h2>{filomeno}</h2>
      <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum </p>
      <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum </p>
      <Icon
        name="arrow"
        className="icon"
        onClick={() => setIsActive(!isActive)}
      />
    </section>
  );
};

```

## motion

    facil de usar cuando algo entra en pantalla.

```typescript
export default Component  ()  {

  const textAnimate = {
    initial: { y: 100, opacity: 0 },
    onscreen: { y: 0, opacity: 1, transition: { type: 'spring', bounce: 0.4, duration: 1 } },
  }
  const titleAnamiate = {
    initial: { y: 50, opacity: 0 },
    onscreen: { y: 0, opacity: 1, transition: { type: 'spring', bounce: 0.4, duration: 0.5 } },
  }

return(
	<motion.section
        initial={'initial'}
        whileInView={'onscreen'}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ staggerChildren: 0.1 }}
        // exit={{ y: 200 }}
      >
        <motion.h2 variants={titleAnamiate}>{filomeno}</motion.h2>

        <motion.p variants={textAnimate}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, culpa? Ipsam porro magnam quos tenetur quas, facilis, accusamus
        </motion.p>
        <motion.p variants={textAnimate}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, culpa? Ipsam porro magnam quos tenetur quas, facilis, accusamus
        </motion.p>
        <Icon name="arrow" className="icon" />
      </motion.section>
	)
}
```

## useScroll

```typescript

  const { scrollYProgress, scrollY } = useScroll({
    target: targetRef,
    offset: ['start 0.8', 'center 0.5'],
  })
  scrollYProgress.on('change', (v) => console.log(v))
  const x = useTransform(scrollYProgress, [0, 1], ['100%', '0%']) // clave doy vuelta los valores para que el inicial sea 100% y se anime hacia el centro

<motion.div ref={targetRef}></motion.div >

```
