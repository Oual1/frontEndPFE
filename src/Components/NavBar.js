

function NavBar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-white bg-white sticky-top">
    <div class="container">
        <a href="" class="navbar-brand"><img src="./source/images/Capture.png" alt="easylo logo"/></a>

        <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#easylo" type="button">
            <span class="bi bi-list"></span>
        </button>

        <div class="collapse navbar-collapse" id="easylo">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item"> <a class="nav-link text-dark" href="/">Home</a> </li>
                <li class="nav-item"> <a class="nav-link text-dark" href="/upload">Upload</a> </li>
                <li class="nav-item"> <a class="nav-link text-dark" href="/status">Status</a></li>
                <li class="nav-item"> <a class="nav-link text-dark" href="/signup">SignUp</a></li>
              
                <li class="nav-item"> <a class="nav-link btn border-0 btn-primary" href="">Contact</a></li>
            </ul>
            
        </div>
    </div>

</nav>
  );
}

export default NavBar