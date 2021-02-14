<script lang="typescript">
  import Canvas from '../p5/Canvas.svelte'

  let x = 100;
  let y = 100;
  let width = 100;
  let height = 100;

  let dt = 0.1;

  const sketch = (p: p5) => {
    let w = p.random(50, 100)
    let h= p.random(50, 100)

    p.setup = () => {
      p.createCanvas(p.windowWidth, 410);
      width = p.width - w
      height = p.height -h
      x  = width/2 - w/2
      y  = height/2 - h/2
    };

    p.draw = () => {
      p.background(0);
      p.fill(255);
      p.rect(x, y, w, h);
    };
  };
</script>

<Canvas sketch={sketch} />
<label>
 x:  <input type=range min="0" max={width} bind:value={x} >
</label>
<label>
 y: <input type=range min="0" max={height} bind:value={y} >
</label>

<label>
  speed:
  <input  type=range min=0.0 max=1.0 step=0.05 bind:value={dt} >
  {dt}
</label>
