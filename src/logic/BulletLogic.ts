import { bullets, app } from "../main";

export const fnBulletLogic = () => {
  // Collision
  if (bullets.length > 0)
    bullets.forEach((bullet, index) => {
      bullet.move();
      bullet.tick();
    });

  // Remove if dead
  for (let i = 0; i < bullets.length; i++) {
    if (bullets[i].getRootObject().position.x < 0 || bullets[i].getRootObject().position.y < 0) {
      bullets[i].dead = true;
    }

    if (bullets[i].dead == true) {
      app.stage.removeChild(bullets[i].getRootObject());
      bullets.splice(i, 1);
    }
  }
};
