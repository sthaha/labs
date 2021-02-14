<script lang="typescript">
  import Canvas from '../p5/Canvas.svelte'

  const sketch = (p: p5) => {
    let x = 100;
    let y = 100;
    let w = p.random(50, 100)
    let h= p.random(50, 100)
     h= p.random(50, 100)

    p.setup = () => {
      p.createCanvas(p.windowWidth, 410, p.WEBGL);
    };

    p.draw = () => {
      p.background(0);
      p.normalMaterial();
      p.translate(0, 0, 0);

      p.push();
      p.rotateZ(p.frameCount * 0.01);
      p.rotateX(p.frameCount * 0.01);
      p.rotateY(p.frameCount * 0.01);
      p.torus(70, 20);
      p.pop();

    };
  };
</script>

<Canvas sketch={sketch} />
