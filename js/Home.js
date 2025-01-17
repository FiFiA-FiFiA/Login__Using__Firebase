class FireBase {
  FireBaseRef;
  constructor() {
    this.FireBaseRef = firebase.firestore();
    this.FireBaseDataRef = firebase.database();
  }

  async Add__User(User__Item) {
    try {
      let Users__Json = JSON.stringify(User__Item);
      await this.FireBaseRef.collection("Users").add(JSON.parse(Users__Json));
    } catch (error) {
      alert("Error ->" + error);
    }
  }

  async Get__UsersById(Id) {
    let Users = await this.FireBaseRef.collection("Users").doc(Id).get();
    if (Users.exists) {
      let Temp = Users.data();
      Temp = Users.Id;
    }
  }

  async Get__AllUsers() {
    let Users__Arr = [];
    let Users = await this.FireBaseRef.collection("Users").get();

    Users.forEach(user => {
      let Temp = user.data();
      Temp.Id = user.id;
      Users__Arr.push(Temp);
    });

    Get__AllUsers__Data(Users__Arr);
  }

  async Update__UserPassById(Id, Pass) {
    await this.FireBaseRef.collection("Users").doc(Id).update({
      Password: Pass,
    });
  }

  async Update__User__FollowInfo__ById(Id, Follower, Following) {
    await this.FireBaseRef.collection("Users").doc(Id).update({
      FollowerUser: Follower,
      FollowingUser: Following,
    });
  }

  async Delete__UsersById(Id) {
    await this.FireBaseRef.collection("Users").doc(Id).delete();
  }
}

let FBW = new FireBase();
FBW.Get__AllUsers();

// ======= Header Start ======= //
const Loading__Contaner = document.querySelector("[Loading__Contaner]");
const Container = document.querySelector("[Container]");
// ======= Header Start ======= //
// ======= Header Start ======= //
const Header__Logout__Btn = document.querySelector("[Header__Logout__Btn]");
const Btn__User__Icon = document.querySelector("[Btn__User__Icon]");
const Btn__User__Image = document.querySelector("[Btn__User__Image]");
// ======= Header End ======= //

// ======= Nav Start ======= // 
const Nav__Container = document.querySelector("[Nav__Container]");
const Nav__Overlay = document.querySelector("[Nav__Overlay]");
const Btn__NavClose = document.querySelector("[Btn__NavClose]");
const Nav__Title = document.querySelector("[Nav__Title]");
const Btn__NavSetting = document.querySelector("[Btn__NavSetting]");
const Nav__UserContent = document.querySelectorAll("[Nav__UserContent]");
const Nav__UserProfileWrapper = document.querySelector("[Nav__UserProfileWrapper]");
// Nav Input
const Email__Input = document.querySelector("[Nav__Forgot__Email__Input]");
const SecretKey__Input = document.querySelector("[Nav__Forgot__SecretKey__Input]");
const NewPassword__input = document.querySelector("[Nav__NewPassword__input]");
const Confirm__NewPassword__input = document.querySelector("[Nav__Confirm__NewPassword__input]");
// Nav Action Buttons
const Nav__Button__Wrapper = document.querySelector("[Nav__Button__Wrapper]");
const Nav__Btn__Logout = document.querySelector("[Nav__Btn__Logout]");
const Nav__Btn__SwitchAccount = document.querySelector("[Nav__Btn__SwitchAccount]");
const Nav__Btn__ChangePassword = document.querySelector("[Nav__Btn__ChangePassword]");
const Nav__Btn__DeleteAccount = document.querySelector("[Nav__Btn__DeleteAccount]");

const err__text = document.querySelector("[err__text]");
// ======= Nav End ======= //

// ======= Main Start ======= //
const Main__Content__Wrapper = document.querySelector("[Main__Content__Wrapper]");
const Select__SortBy = document.querySelector("[Select__SortBy]");
const People__Item__Wrapper = document.querySelector("[People__Item__Wrapper]");
// ======= Aside Start ======= //
const Aside__Container = document.querySelector("[Aside__Container]");
const Aside__Overlay = document.querySelector("[Aside__Overlay]");
const User__Profile__Content = document.querySelector("[User__Profile__Content]");
const Btn__AsideClose = document.querySelector("[Btn__AsideClose]");
const Aside__Title = document.querySelector("[Aside__Title]");
const Follow__Btn__Wrapper = document.querySelector("[Follow__Btn__Wrapper]");
const Follow__Btn = document.querySelector("[Follow__Btn]");
const Unfollow__Btn = document.querySelector("[Unfollow__Btn]");

// ======= Aside End ======= //

// ======= Follow Start ======= //
const Follows__Contaner = document.querySelector("[Follows__Contaner]");
const Follows__Overlay = document.querySelector("[Follows__Overlay]");
const Btn__FollowerClose = document.querySelector("[Btn__FollowerClose]");
const Follower__Tab__Btn = document.querySelectorAll("[Follower__Tab__Btn]");
const Follower__Tab__Contaner = document.querySelectorAll("[Follower__Tab__Contaner]");
const Follower__Tab__Inner = document.querySelector("[Follower__Tab__Inner]");
const Following__Tab__Inerr = document.querySelector("[Following__Tab__Inerr]");
// ======= Follow End ======= //

// ======= SwitchAccount Start ======= //
const SwitchAccount__Contaner = document.querySelector("[SwitchAccount__Contaner]");
const SwitchAccount__Overlay = document.querySelector("[SwitchAccount__Overlay]");
const Btn__SwitchAccount__Close = document.querySelector("[Btn__SwitchAccount__Close]");
const Form__err__text = document.querySelectorAll("[Form__err__text]");
const SwitchAccount__Email__Input = document.querySelector("[SwitchAccount__Email__Input]");
const SwitchAccount__Password__Input = document.querySelector("[SwitchAccount__Password__Input]");
const Btn__Switch = document.querySelector("[Btn__Switch]");
// ======= SwitchAccount End ======= //

// ======= DeleteAccount Start ======= //
const DeleteAccount__Contaner = document.querySelector("[DeleteAccount__Contaner]");
const DeleteAccount__Overlay = document.querySelector("[DeleteAccount__Overlay]");
const Btn__DeleteAccount__Close = document.querySelector("[Btn__DeleteAccount__Close]");
const DeleteAccount__Email__Input = document.querySelector("[DeleteAccount__Email__Input]");
const DeleteAccount__Password__Input = document.querySelector("[DeleteAccount__Password__Input]");
const Btn__Delete = document.querySelector("[Btn__Delete]");
// ======= DeleteAccount End ======= //

// User Array
let All__User__Arr = JSON.parse(localStorage.getItem("_User")) || [];
let Ovner__User = JSON.parse(localStorage.getItem("_Logged__User")) || [];
let Logged__User__Index = JSON.parse(localStorage.getItem("_Logged__User__Index")) || 0;
let Logged__User__Id = JSON.parse(localStorage.getItem("_Logged__User__Index")) || 0;
let Logged = JSON.parse(localStorage.getItem("_Logged")) || "false";
let New__All__User__Arr = All__User__Arr;

const Form__Url = "./Form.html";
const Home__Url = "./Home.html";

async function Get__AllUsers__Data(All__Users) {
  const Logged__User__Index = JSON.parse(localStorage.getItem("_Logged__User__Index")) || 0;
  const Logged__User__Id = JSON.parse(localStorage.getItem("_Logged__User__Id")) || "";
  const Logged = JSON.parse(localStorage.getItem("_Logged")) || "false";

  let All__User__Arr = All__Users;
  let Ovner__User = All__User__Arr.filter(User => User.Id == Logged__User__Id);
  Ovner__User = Ovner__User[0] || "undefined";

  if (Ovner__User == "" || Ovner__User == "undefined" || Logged == "" || Logged == "false") {
    localStorage.setItem('_Logged', "false");
    localStorage.removeItem('_Logged__User__Index');
    localStorage.removeItem('_Logged__User__Id');
    window.location = Form__Url;
  }
  Loading__Contaner.classList.remove('active');
  Container.classList.add('active');

  // ======= Eventlistener Start ======= //
  Btn__User__Icon.addEventListener('click', OpanClose__Nav__Container);
  Btn__NavClose.addEventListener('click', OpanClose__Nav__Container);
  Nav__Overlay.addEventListener('click', OpanClose__Nav__Container);

  Header__Logout__Btn.addEventListener('click', Loguot__Ovner__User);
  Nav__Btn__Logout.addEventListener('click', Loguot__Ovner__User);
  Nav__Btn__ChangePassword.addEventListener('click', ResetPassword__Valid);
  Btn__NavSetting.addEventListener('click', Toggle__Nav__UserContent);

  Select__SortBy.addEventListener('change', Get__SortBy__Value);

  Aside__Overlay.addEventListener('click', Close__Aside__Contaner);
  Btn__AsideClose.addEventListener('click', Close__Aside__Contaner);

  Follow__Btn.addEventListener('click', Follow__User);
  Unfollow__Btn.addEventListener('click', Unfollow__User)

  Follows__Overlay.addEventListener('click', Close__Follow__Contaner);
  Btn__FollowerClose.addEventListener('click', Close__Follow__Contaner);

  Nav__Btn__SwitchAccount.addEventListener('click', Open__SwitchAccount__Contaner);
  SwitchAccount__Overlay.addEventListener('click', Close__SwitchAccount__Contaner);
  Btn__SwitchAccount__Close.addEventListener('click', Close__SwitchAccount__Contaner);
  Btn__Switch.addEventListener('click', SignIn__Valid__Input);

  Nav__Btn__DeleteAccount.addEventListener('click', Open__DeleteAccount__Contaner);
  DeleteAccount__Overlay.addEventListener('click', Close__DeleteAccount__Contaner);
  Btn__DeleteAccount__Close.addEventListener('click', Close__DeleteAccount__Contaner);
  Btn__Delete.addEventListener('click', Delete__Valid__Input);
  // ======= Eventlistener End ======= //

  Follower__Tab__Btn.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      Follower__Tab__Btn.forEach(nbtn => nbtn.classList.remove('active'))
      Follower__Tab__Contaner.forEach(tab => tab.classList.remove('active'))

      Follows__Contaner.classList.remove("Follower");
      Follows__Contaner.classList.remove("Following");

      Follower__Tab__Btn[i].classList.add('active');
      Follower__Tab__Contaner[i].classList.add('active');
    });
  });

  // ======= Function Start ======= //

  function Get__AllUsers__Data(All__User__Arr) {
    People__Item__Wrapper.innerHTML = "";
    for (const All__User of All__User__Arr) {
      let People__Item = document.createElement("div");
      People__Item.classList.add("People__Item");

      People__Item.innerHTML = `
      <div class="Profile__Image">
        <img src="${All__User.Image}" alt="">
      </div>
      <div>
        <h3>${All__User.FirstName} ${All__User.LastName}</h3>
        <span>Followers ${All__User.FollowerUser.length || 0}</span>
      </div>
      `;

      People__Item__Wrapper.appendChild(People__Item);
    }

    document.querySelectorAll(".People__Item .Profile__Image").forEach((item, i) => {
      item.addEventListener('click', () => {
        Opan__PeopleInfo(i);
      });
    });

    document.querySelectorAll(".People__Item div h3").forEach((item, i) => {
      item.addEventListener('click', () => {
        Opan__PeopleInfo(i);
      });
    });
  }
  Get__AllUsers__Data(All__User__Arr);

  function Opan__PeopleInfo(i) {
    Aside__Container.classList.add('active');
    Main__Content__Wrapper.classList.add("active");
    Follow__Btn.setAttribute("index", i);
    Unfollow__Btn.setAttribute("index", i);

    let FollowerUser = All__User__Arr[i].FollowerUser;

    if (Aside__Container.classList.contains('active')) {
      if (All__User__Arr[i].FollowerUser != "") {
        for (const key in FollowerUser) {
          if (FollowerUser[key].Id == Ovner__User.Id) {
            Follow__Btn__Wrapper.classList.replace('Follow', "Unfollow");
            Follow__Btn__Wrapper.classList.add("Unfollow");
          } else {
            Follow__Btn__Wrapper.classList.replace('Unfollow', "Follow");
            Follow__Btn__Wrapper.classList.add("Follow");
          }
        }
      } else {
        Follow__Btn__Wrapper.classList.replace('Unfollow', "Follow");
        Follow__Btn__Wrapper.classList.add("Follow");
      }

      if (All__User__Arr[i].Id == Ovner__User.Id) {
        Aside__Title.textContent = "Your Information";
        Follow__Btn__Wrapper.classList.add("hidden");
      } else {
        Aside__Title.textContent = "Information";
        Follow__Btn__Wrapper.classList.remove("hidden");
      }

      User__Profile__Content.innerHTML = `
      <div class="User__Profile__Top">
        <div class="User__Image">
          <img src="${All__User__Arr[i].Image}" alt="">
        </div>
        <h2 class="User__Name">${All__User__Arr[i].FirstName} ${All__User__Arr[i].LastName}</h2>
        <div>
          <h4 class="User__Follower__Btn" User__Follower__Btn>Followers ${All__User__Arr[i].FollowerUser.length}</h4>
          <h4 class="User__Following__Btn" User__Following__Btn>Following ${All__User__Arr[i].FollowingUser.length}</h4>
        </div>
      </div>

      <div class="User__Profile__Bottom">
        <div class="User__Bio">
          <h3>Bio</h3>
          <p>${All__User__Arr[i].Bio}</p>
        </div>
        <div class="User__Info">
          <h4>Birthday:</h4>
          <h4>${All__User__Arr[i].Birthday}</h4>
        </div>
        <div class="User__Info">
          <h4>Gender:</h4>
          <h4>${All__User__Arr[i].Gender}</h4>
        </div>
        <div class="User__Info">
          <h4>Contact:</h4>
          <h4>${All__User__Arr[i].Email}</h4>
        </div>
      </div>`;
    }

    document.querySelector("[User__Follower__Btn]").addEventListener("click", () => {
      Opan__Follow__Contaner("Follower");
      All__User__Follow__Info();
    });

    document.querySelector("[User__Following__Btn]").addEventListener("click", () => {
      Opan__Follow__Contaner("Following");
      All__User__Follow__Info();
    });

    function All__User__Follow__Info() {
      let User__Follower = All__User__Arr[i].FollowerUser;
      let User__Following = All__User__Arr[i].FollowingUser;
      Follower__Tab__Inner.innerHTML = "";
      Following__Tab__Inerr.innerHTML = "";

      if (User__Follower != "") {
        document.querySelector('.Follow__Header__Title').innerText = `${All__User__Arr[i].FirstName} ${All__User__Arr[i].LastName}`;
        for (const Follow of User__Follower) {
          let Follower__People__Item = document.createElement('div');
          Follower__People__Item.classList.add('Follower__People__Item');

          Follower__People__Item.innerHTML = `
          <div class="Profile__Image">
            <img src="${Follow.Image}" alt="">
          </div>
          <div>
            <h3>${Follow.FirstName} ${Follow.LastName}</h3>
            <span>Followers ${Follow.FollowerUser.length}</span>
          </div>`;

          Follower__Tab__Inner.appendChild(Follower__People__Item);
        }
      } else {
        document.querySelector('.Follow__Header__Title').innerText = `${All__User__Arr[i].FirstName} ${All__User__Arr[i].LastName}`;
        Follower__Tab__Inner.innerHTML = '<h3 class="Empty">Followers Are Empty!</h3>';
      }
      if (User__Following != "") {
        document.querySelector('.Follow__Header__Title').innerText = `${All__User__Arr[i].FirstName} ${All__User__Arr[i].LastName}`;
        for (const Follow of User__Following) {
          let Follower__People__Item = document.createElement('div');
          Follower__People__Item.classList.add('Follower__People__Item');

          Follower__People__Item.innerHTML = `
          <div class="Profile__Image">
            <img src="${Follow.Image}" alt="">
          </div>
          <div>
            <h3>${Follow.FirstName} ${Follow.LastName}</h3>
            <span>Followers ${Follow.FollowerUser.length}</span>
          </div>`;

          Following__Tab__Inerr.appendChild(Follower__People__Item)
        }
      } else {
        document.querySelector('.Follow__Header__Title').innerText = `${All__User__Arr[i].FirstName} ${All__User__Arr[i].LastName}`;
        Following__Tab__Inerr.innerHTML = '<h3 class="Empty">Following Are Empty!</h3>';
      }
    }
  }

  function Get__OvnerUser__Data() {
    Nav__UserProfileWrapper.innerHTML = "";

    let Nav__UserProfile = document.createElement('div');
    Nav__UserProfile.setAttribute('Nav__UserProfile', '');
    Nav__UserProfile.classList.add("User__Profile__Content");

    document.querySelector("title").textContent = `Hi ${Ovner__User.FirstName} 💜 | Home`;

    Nav__UserProfile.innerHTML = `
    <div class="User__Profile__Top">
      <div class="User__Image">
        <img src="${Ovner__User.Image}" alt="" Nav__User__Image>
      </div>
      <h2 class="User__Name">${Ovner__User.FirstName} ${Ovner__User.LastName}</h2>
      <div>
        <h4 Ovner__Follower__Btn>Follower ${Ovner__User.FollowerUser.length || 0}</h4>
        <h4 Ovner__Following__Btn>Following ${Ovner__User.FollowingUser.length || 0}</h4>
      </div>
    </div>

    <div class="User__Profile__Bottom">
      <div class="User__Bio">
        <h3>Bio</h3>
        <p>${Ovner__User.Bio}</p>
      </div>
      <div class="User__Info">
        <h4>Birthday:</h4>
        <h4>${Ovner__User.Birthday.split("-")}</h4>
      </div>
      <div class="User__Info">
        <h4>Gender:</h4>
        <h4>${Ovner__User.Gender}</h4>
      </div>
      <div class="User__Info">
        <h4>Contact:</h4>
        <h4>${Ovner__User.Email}</h4>
      </div>
    </div>`;

    Nav__UserProfileWrapper.appendChild(Nav__UserProfile);
    Btn__User__Image.src = Ovner__User.Image;

    document.querySelector("[Ovner__Follower__Btn]").addEventListener("click", () => {
      Opan__Follow__Contaner("Follower");
      Logged__User__Follow__Info();
    });

    document.querySelector("[Ovner__Following__Btn]").addEventListener("click", () => {
      Opan__Follow__Contaner("Following");
      Logged__User__Follow__Info();
    });

    function Logged__User__Follow__Info() {
      let Follower = Ovner__User.FollowerUser;
      let Following = Ovner__User.FollowingUser;

      Follower__Tab__Inner.innerHTML = "";
      Following__Tab__Inerr.innerHTML = "";

      document.querySelector('.Follow__Header__Title').innerText = `${Ovner__User.FirstName} ${Ovner__User.LastName}`;

      if (Follower != "") {
        for (const Follow of Follower) {
          let Follower__People__Item = document.createElement('div');
          Follower__People__Item.classList.add('Follower__People__Item');

          Follower__People__Item.innerHTML = `
          <div class="Profile__Image">
            <img src="${Follow.Image}" alt="">
          </div>
          <div>
            <h3>${Follow.FirstName} ${Follow.LastName}</h3>
            <span>Followers ${Follow.FollowerUser.length}</span>
          </div>`;

          Follower__Tab__Inner.appendChild(Follower__People__Item);
        }
      } else {
        Follower__Tab__Inner.innerHTML = '<h3 class="Empty">Followers Are Empty!</h3>';
      }

      if (Following != "") {
        for (const Follow of Following) {
          let Follower__People__Item = document.createElement('div');
          Follower__People__Item.classList.add('Follower__People__Item');

          Follower__People__Item.innerHTML = `
          <div class="Profile__Image">
            <img src="${Follow.Image}" alt="">
          </div>
          <div>
            <h3>${Follow.FirstName} ${Follow.LastName}</h3>
            <span>Followers ${Follow.FollowerUser.length}</span>
          </div>`;

          Following__Tab__Inerr.appendChild(Follower__People__Item);
        }
      } else {
        Following__Tab__Inerr.innerHTML = '<h3 class="Empty">Following Are Empty!</h3>';
      }
    }
  }
  Get__OvnerUser__Data();

  function Follow__User() {
    let i = Follow__Btn.getAttribute("index");

    console.log(All__User__Arr[i].FollowerUser);

    if (!All__User__Arr[i].FollowerUser.includes(Ovner__User)) {
      let FollowerUser = All__User__Arr[i].FollowerUser;
      FollowerUser.push(Ovner__User);

      FBW.Update__User__FollowInfo__ById(All__User__Arr[i].Id, FollowerUser, []);
      Follow__Btn__Wrapper.classList.replace('Follow', "Unfollow");
    } else {
      Follow__Btn__Wrapper.classList.replace('Unfollow', "Follow");
    }

    if (!Ovner__User.FollowingUser.includes(All__User__Arr[i])) {
      let FollowingUser = Ovner__User.FollowingUser;
      FollowingUser.push(All__User__Arr[i]);

      FBW.Update__User__FollowInfo__ById(Ovner__User.Id, [], FollowingUser);
    }

    Get__AllUsers__Data(All__User__Arr);
    Get__OvnerUser__Data();
  }

  function Unfollow__User() {
    let i = Unfollow__Btn.getAttribute("index");

    Follow__Btn__Wrapper.classList.replace('Unfollow', "Follow");

    let Remove__Index = All__User__Arr[i].FollowerUser.findIndex(i => i.Id == Ovner__User.Id);
    All__User__Arr[i].FollowerUser.splice(Remove__Index, 1);

    let FollowingUser = All__User__Arr[i].FollowerUser;
    FBW.Update__User__FollowInfo__ById(All__User__Arr[i].Id, FollowingUser, []);

    Get__AllUsers__Data(All__User__Arr);
    Get__OvnerUser__Data();
  }

  function ResetPassword__Valid() {
    let Email__Value = Email__Input.value;
    let SecretKey__Value = SecretKey__Input.value;
    let NewPassword__Value = NewPassword__input.value;
    let Confirm__NewPassword__Value = Confirm__NewPassword__input.value;

    let findIndex = All__User__Arr.findIndex(i => i.Email == Email__Value && i.SecretKey == SecretKey__Value);
    let index = findIndex;

    if (Email__Value != "") {
      if (SecretKey__Value != "") {
        if (findIndex >= 0) {
          if (NewPassword__Value != "" && Confirm__NewPassword__Value != "") {
            if (NewPassword__Value.length >= 8 && Confirm__NewPassword__Value.length >= 8) {
              if (NewPassword__Value == Confirm__NewPassword__Value) {
                if (NewPassword__Value.toLowerCase() != Confirm__NewPassword__Value) {
                  All__User__Arr[index].Password = NewPassword__Value;
                  localStorage.setItem('_Logged', "true");
                  localStorage.removeItem('_Logged__User__Index');
                  localStorage.setItem('_Logged__User__Index', JSON.stringify(index));

                  FBW.Update__UserPassById(All__User__Arr[index].Id, NewPassword__Value);
                  FBW.Get__AllUsers();

                  Email__Input.value = "";
                  SecretKey__Input.value = "";
                  NewPassword__input.value = "";
                  Confirm__NewPassword__input.value = "";
                  Show__Error("Password has been changed!", 2000);
                } else {
                  Show__Error("Password must contain at least one upperacase character!", 2000);
                }
              } else {
                Show__Error("Password does not matches!", 2000);
              }
            } else {
              Show__Error("Password should be minimum 8 characters!", 2000);
            }
          } else {
            Show__Error("Password can't be empty!", 2000);
          }
        } else {
          Show__Error("Email or Secret key doesn't match!", 2000);
        }
      } else {
        Show__Error("Secret key can't be Empty!", 2000);
      }
    } else {
      Show__Error("Email can't be Empty!", 2000);
    }
  }

  function OpanClose__Nav__Container() {
    Nav__Container.classList.toggle('active');
  }

  function Loguot__Ovner__User() {
    localStorage.setItem("_Logged", "false");
    if (localStorage.getItem("_Logged") == "false") {
      localStorage.removeItem("_Logged__User__Index");
      localStorage.removeItem("_Logged__User__Id");
      window.location = Form__Url;
    }
  }

  function Get__SortBy__Value() {
    let SortBy__Value = Select__SortBy.value;

    if (SortBy__Value == "") {
      New__All__User__Arr = All__User__Arr;
      Get__AllUsers__Data(New__All__User__Arr);
    }

    if (SortBy__Value == "Defult") {
      New__All__User__Arr = All__User__Arr;
      Get__AllUsers__Data(All__User__Arr);
    }

    if (SortBy__Value == "Age") {
      New__All__User__Arr = All__User__Arr;
      New__All__User__Arr = New__All__User__Arr.sort((a, b) => {
        if (a.Birthday > b.Birthday) {
          return 1
        } else {
          return -1
        }
      });

      Get__AllUsers__Data(New__All__User__Arr);
    }

    if (SortBy__Value == "Name") {
      New__All__User__Arr = All__User__Arr;
      New__All__User__Arr = New__All__User__Arr.sort((a, b) => {
        a = a.FirstName.toLowerCase();
        b = b.FirstName.toLowerCase();
        if (a < b) {
          return -1
        } else {
          return 1
        }
      });
      Get__AllUsers__Data(New__All__User__Arr);
    }

    if (SortBy__Value == "Female") {
      New__All__User__Arr = All__User__Arr;
      New__All__User__Arr = New__All__User__Arr.filter(i => i.Gender == SortBy__Value);

      Get__AllUsers__Data(New__All__User__Arr);
    }

    if (SortBy__Value == "Male") {
      New__All__User__Arr = All__User__Arr;
      New__All__User__Arr = New__All__User__Arr.filter(i => i.Gender == SortBy__Value);

      Get__AllUsers__Data(New__All__User__Arr);
    }

    Get__AllUsers__Data(New__All__User__Arr);
  }

  function Toggle__Nav__UserContent() {
    Nav__UserContent.forEach(content => {
      content.classList.toggle('active');
      if (Nav__UserContent[1].classList.contains('active')) {
        Btn__NavSetting.classList.add('active');
        Nav__Title.classList.add('active');
        Nav__Button__Wrapper.classList.add('active');
      } else {
        Btn__NavSetting.classList.remove('active');
        Nav__Button__Wrapper.classList.remove('active');
        Nav__Title.classList.remove('active');
      }
    });
  }

  function Opan__Follow__Contaner(value) {
    Follows__Contaner.classList.add("active", value);
  }

  function Close__Follow__Contaner() {
    Follows__Contaner.classList.remove("active");
    Follows__Contaner.classList.remove("Follower");
    Follows__Contaner.classList.remove("Following");
  }

  function Open__SwitchAccount__Contaner() {
    SwitchAccount__Contaner.classList.add('active');
  }

  function Open__DeleteAccount__Contaner() {
    DeleteAccount__Contaner.classList.add('active');
  }

  function SignIn__Valid__Input() {
    let Email__Value = SwitchAccount__Email__Input.value;
    let Password__Value = SwitchAccount__Password__Input.value;

    if (Email__Value != "") {
      if (Password__Value != "") {
        if (Password__Value.length >= 8) {
          Check__SignIn__User(Email__Value, Password__Value);
        } else {
          SwitchAccount__Show__Error("Password should be minimum 8 characters!", 3000);
        }
      } else {
        SwitchAccount__Show__Error("password can't be empty!", 3000);
      }
    } else {
      SwitchAccount__Show__Error("Email can't be empty!", 3000);
    }
  }

  function Delete__Valid__Input() {
    let Email__Value = DeleteAccount__Email__Input.value;
    let Password__Value = DeleteAccount__Password__Input.value;

    if (Email__Value != "") {
      if (Password__Value != "") {
        if (Password__Value.length >= 8) {
          Check__Delete__User(Email__Value, Password__Value);
        } else {
          SwitchAccount__Show__Error("Password should be minimum 8 characters!", 3000);
        }
      } else {
        SwitchAccount__Show__Error("password can't be empty!", 3000);
      }
    } else {
      SwitchAccount__Show__Error("Email can't be empty!", 3000);
    }
  }

  function Check__SignIn__User(Email, Password) {
    if (All__User__Arr != "") {
      let New__Ovner__User = All__User__Arr.filter(i => i.Email == Email && i.Password == Password);
      let Index = All__User__Arr.findIndex(i => i.Email == Email && i.Password == Password);
      if (New__Ovner__User != "") {
        Switch__Account(New__Ovner__User, Index);
      } else {
        SwitchAccount__Show__Error("User not found!", 2000);
      }
    } else {
      SwitchAccount__Show__Error("User doesn't exist!", 2000);
    }
  }

  function Check__Delete__User(Email, Password) {
    if (All__User__Arr != "") {
      let New__Ovner__User = All__User__Arr.filter(i => i.Email == Email && i.Password == Password);
      if (New__Ovner__User != "") {
        Delete__User(New__Ovner__User);
      } else {
        SwitchAccount__Show__Error("User not found!", 2000);
      }
    } else {
      SwitchAccount__Show__Error("User doesn't exist!", 2000);
    }
  }

  function Switch__Account(New__Logged__User, Index) {
    let Id = New__Logged__User[0].Id;
    localStorage.setItem('_Logged', "true");
    localStorage.removeItem('_Logged__User__Index');
    localStorage.removeItem('_Logged__User__Id');
    localStorage.setItem('_Logged__User__Index', JSON.stringify(Index));
    localStorage.setItem('_Logged__User__Id', JSON.stringify(Id));
    window.location = Home__Url;
  }

  function Delete__User(New__Logged__User) {
    let Id = New__Logged__User[0].Id;
    localStorage.setItem('_Logged', "false");
    localStorage.removeItem('_Logged__User__Index');
    localStorage.removeItem('_Logged__User__Id');
    FBW.Delete__UsersById(Id);
    setTimeout(() => { window.location = Form__Url }, 500);
  }

  function Close__SwitchAccount__Contaner() {
    SwitchAccount__Contaner.classList.remove('active');
  }

  function Close__DeleteAccount__Contaner() {
    DeleteAccount__Contaner.classList.remove('active');
  }

  function Close__Aside__Contaner() {
    Aside__Container.classList.remove('active');
    Main__Content__Wrapper.classList.remove("active");
  }

  function Show__Error(err, duration) {
    err__text.classList.add("active");
    err__text.innerText = err;
    setTimeout(() => {
      err__text.classList.remove("active");
    }, duration);
  }

  function SwitchAccount__Show__Error(err, duration) {
    Form__err__text.forEach(Text => {
      Text.classList.add("active");
      Text.textContent = err;
    })
    setTimeout(() => {
      Form__err__text.forEach(Text => {
        Text.classList.remove("active");
      })
    }, duration);
  }
}