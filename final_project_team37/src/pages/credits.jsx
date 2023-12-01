import Menubar from "../components/menubar";



function Credits() {
  return (
    <>
      <Menubar />
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1>ComS319 Project Team 37</h1>
          <h1>Abstract</h1>
          <p>
            For our midterm project we decided to make a shop for users to buy and sell pokemon.
            This project utilizes the <a href="https://pokeapi.co/about">PokeAPI</a> to fetch JSON data for us to use in our app.

          </p>

          <h1 class="fw-light">Credits:</h1>
          <p class="lead text-body-secondary"><strong>Developers:</strong> Robert Holeman and Breckin Bartels</p>
          <p class="lead text-body-secondary"><strong>Emails:</strong> <a href="mailto:holeman3@iastate.edu">holeman3@iastate.edu</a> and <a href="mailto:breckinb@iastate.edu">breckinb@iastate.edu</a></p>
          <p class="lead text-body-secondary"><strong>Course: </strong>ComS319 - Construction of User Interfaces</p>
          <p class="lead text-body-secondary"><strong>Professor: </strong>Abraham Aldaco Gastelum</p>
          <p class="lead text-body-secondary"><strong>Date: </strong>9-Dec-2023</p>

          <h3 class="fw-light">Work Cited:</h3>
          <p>
            <ul>
              <li><a href="https://pokeapi.co/">PokeAPI</a></li>
            </ul>
          </p>
        </div>
      </div>


      <main>
        <footer>
          <p style={{ textAlign: 'center' }}>&copy; Team 37: Robert Holeman and Breckin Bartels</p>
        </footer>

      </main>
    </>
  );
}

export default Credits;
