<script lang="typescript">
  import Canvas from './Canvas.svelte'

  const sketch = (p: p5) => {
    let x = 100;
    let y = 100;
    let w = p.random(50, 100)
    let h= p.random(50, 100)
     h= p.random(50, 100)

    p.setup = () => {
      p.createCanvas(p.windowWidth, 410);
    };

    p.draw = () => {
      p.background(0);
      p.fill(255);
      p.rect(x, y, w, h);
    };
  };
</script>

<Canvas sketch={sketch} />
