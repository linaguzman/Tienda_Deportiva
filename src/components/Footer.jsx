import React from 'react'

const Footer = () => {
    return (
        <div>
          <footer>    
          <div class="container_footer">
            <div class="box_footer">
              <div class="logo">
                <img src="balon.png" alt=""/>
              </div>
            </div>
           <div class="box__footer">
              <h2>Redes sociales</h2>
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
              <a href="#">Youtube</a>
            </div>
          </div>
          <div class="box__copyright">
            <hr />
            <p>
              Todos los derechos reservados ©™2021
            </p>
          </div>   
          </footer>   
        </div>
    )
}

export default Footer
