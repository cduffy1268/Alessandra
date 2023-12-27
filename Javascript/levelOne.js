const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = .7

class player{
    constructor({health, velocity, position, width, height, color = "red", offset}){
        this.health = health
        this.velocity = velocity
        this.position = position
        this.width = width
        this.height = height
        this.jump
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y 
            },
            offset,
            width: 100,
            height: 50
        },
        this.color = color
        this.isAttacking,
        this.health = 100
    }
    draw(){
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //attackBox
        if(this.isAttacking){
            c.fillStyle = "green"
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }
    attack(){
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
    update(){
        this.draw()

        this.attackBox.position.x = this.position.x - this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
            this.jump = 0
        }
        else{
            this.velocity.y += gravity 
        }


    }
}



const character = new player({
    health: 100,
    velocity:{
        x: 0,
        y: 0
    },
    position:{
        x: 0,
        y: 0
    },
    offset:{
        x: 0,
        y:0
    },
    height: 150,
    width: 50
})





const player2 = new player({
    health: 100,
    velocity:{
        x: 0,
        y: 0
    },
    position:{
        x: 100,
        y: 100
    },
    offset:{
        x: 50,
        y:0
    },
    height: 150,
    width: 50,
    color: "blue"
    
})

const keys = {
    a: {
        pressed: false
    },
    d:{
        pressed: false
    },
    w:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    },
    ArrowUp:{
        pressed: false
    }
}

function rectangularCollision({rectangle1, rectangle2}){
    return(rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
}
function animation(){
    requestAnimationFrame(animation)
    c.fillStyle = "rgba(0, 0, 0, 0.3)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    character.update()
    player2.update()

    if(keys.a.pressed){
        character.velocity.x = -5
    }
    else if(keys.d.pressed){
        character.velocity.x = 5
    }
    else{
        character.velocity.x = 0
    }

    if(keys.w.pressed && character.jump < 2){
        character.velocity.y = -10
    }

    if(keys.ArrowLeft.pressed){
        player2.velocity.x = -5
    }
    else if(keys.ArrowRight.pressed){
        player2.velocity.x = 5
    }
    else{
        player2.velocity.x = 0 
    }
    if(keys.ArrowUp.pressed && player2.jump < 2){
        player2.velocity.y = -10
    }

    //detect collision
    if(rectangularCollision({rectangle1: character, rectangle2: player2}) && character.isAttacking){
        character.isAttacking = false
        player2.health -= 20
        document.querySelector("#playerHealth").style.width = player2.health + '%'
    }

    if(rectangularCollision({rectangle1: player2, rectangle2: character}) && player2.isAttacking){
        player2.isAttacking = false
        character.health -= 20
        document.querySelector("#characterHealth").style.width = character.health + '%'
    }

}
animation()

addEventListener("keydown", (event)=>{
    switch(event.key){
        case "d":
            keys.d.pressed = true
            break;
        case "a":
            keys.a.pressed = true
            break;
        case "w":
            keys.w.pressed = true
            setTimeout(()=>{
                keys.w.pressed = false
                character.jump++
            }, 100)
            break;
        case " ": 
            character.attack()
            break;
        case "ArrowRight":
            keys.ArrowRight.pressed = true
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = true
            break;
        case "ArrowUp":
            keys.ArrowUp.pressed = true
            setTimeout(()=>{
                keys.ArrowUp.pressed = false
                player2.jump++
            }, 100)
            break;
        case "l":
            player2.attack()
            break;
    } 
})

addEventListener("keyup", (event) =>{
    switch(event.key){
        case "d":
            keys.d.pressed = false
            break;
        case "a":
            keys.a.pressed = false
            break;
        case "ArrowRight":
            keys.ArrowRight.pressed = false
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false
            break;
    }
})



