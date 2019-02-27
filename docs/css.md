# CSS


## animation keyframe
´´´css
      
      .mi_objeto{
		animation-name: my_animation;
		animation-duration: 12s;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
		/* animation-delay: 2s; */

	}


	@keyframes my_animation {
		
		0%,15% {transform:    translateZ(-130px) rotateY(0deg)    ;}
		25%,40% {transform:   translateZ(-130px) rotateY(-180deg) ;}
		50%,90% {transform:   translateZ(-130px) rotateX(-90deg)  ;}
		100% {transform:  translateZ(-130px) rotateX(90deg)   ;}
	}
´´´

## 3D

´´´css
.scene {
		width: 300px;
		height: 250px;
		perspective: 300px;
      }
.mi_objeto{
      transform-style: preserve-3d;
	transform: translateZ(-100px);
}


## 3d + animation keyframe
´´´
<style>
      .scene {
		width: 500px;
		height: 250px;

		perspective: 300px;
            perspective-origin: 0% 75%;

            background: #d4d4d4;
            

      }
      .mi_objeto_1{
            width: 100px;
            height: 100px;
            transform-style: preserve-3d;
	      /* transform: translateZ(-100px); */

		animation-name: my_animation;
		animation-duration: 12s;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
		/* animation-delay: 2s; */
            background: #5069a0;
            will-change: transform; /*obsoleto?*/


	}
      .mi_objeto_2{
            width: 100px;
            height: 100px;
            transform-style: preserve-3d;
	      transform: translateZ(200px) translateX(200px);

		animation-name: my_animation2;
		animation-duration: 2s;
		animation-iteration-count: 3;
		animation-fill-mode:  both; 
		animation-delay: 2s;
            background: #53a050;
            will-change: transform; /*obsoleto?*/
            backface-visibility: hidden;

	}
	@keyframes my_animation {
		0%,15%      {transform: translateZ(-100px)       rotateY(0deg)    ;}
		25%,40%     {transform: translateZ(-100px)       rotateY(-180deg) ;}
		50%,90%     {transform: translateZ(-100px)       rotateX(-90deg)  ;}
		100%        {transform: translateZ(-100px)       rotateX(90deg)   ;}
	}

	@keyframes my_animation2 {
		0%,15%      {transform: translate3d(100px,0, 100px)       rotateY(0deg)    ;}
		25%,40%     {transform: translate3d(100px,0, 100px)       rotateY(-180deg) ;}
		50%,90%     {transform: translate3d(100px,0, 100px)       rotateX(-90deg)  ;}
		100%        {transform: translate3d(100px,0, 100px)       rotateX(90deg)   ;}
	}
</style>

<div class="scene">
      <div class="mi_objeto_1">Objeto 1</div>
      <div class="mi_objeto_2">objeto 2 backface hiden</div>
</div>
´´´


## Grid

### Explicit:
	
- grid-template-columns
- grid-template-rows
- grid-template-areas

### Implicit:

- grid-auto-columns
- grid-auto-rows

### Gaps

- grid-column-gap
- grid-row-gap
- grid-gap

### Positioning items in a grid

- grid-column
- grid-row

### Aligning things

- justify-content
- align-content
- justify-items
- align-items
- justify-self
- align-self

[click grid](wwww.wgon.tk/docs/grid/grid.html)