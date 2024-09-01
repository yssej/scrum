import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Fichier } from 'src/app/models/fichier';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { FichierService } from 'src/app/services/fichier.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import * as html2pdf from 'html2pdf.js';
import { OAuthService } from 'angular-oauth2-oidc';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-utilisateurs',
  templateUrl: './list-utilisateurs.component.html',
  styleUrls: ['./list-utilisateurs.component.css']
})
export class ListUtilisateursComponent implements OnInit {

  totalLength:any;
  page:number = 1;
  isCollapsed = true;
  myGroup: FormGroup;
  closeResult = '';
  users:User[];
  userCreate:User = new User();
  userProfil:User;
  nom:File[];
  roles:Role[];
  rolesNotToUser:Role[];
  actualUser:User;
  roleSelected:string;
  photo:Fichier[];
  userPhoto:Fichier;
  tri:string;
  typeDeTri:string;
  roleTri:string;
  nomRecherche:string;
  token:string;
  nomPhoto:String[];
  usernameAvailable = true;
  emailAvailable = true;

  constructor(private userService:UserService,private modalService: NgbModal,private fichierService:FichierService,private roleService:RoleService,
    private oauthService:OAuthService,private login:LoginService,private router:Router) {
    this.myGroup = new FormGroup({
      nom: new FormControl()
    })
  }

  ngOnInit(): void {
    if(this.login.getIsLogged() == false) {
      this.router.navigate(['/Acceuil']);
    } else {
      this.getUsers();
      this.getPdp();
    }
  }

  isUsernameAvailable() {
    for(let user of this.users) {
      if(this.userCreate.username == user.username) {
        this.usernameAvailable = false;
        break;
      } else this.usernameAvailable = true;
    }
  }

  isEmailAvailable() {
    for(let user of this.users) {
      if(this.userCreate.email == user.email) {
        this.emailAvailable = false;
        break;
      } else this.emailAvailable = true;
    }
  }

  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
      this.userPhoto = new Fichier();
      console.log(this.userPhoto);
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.userPhoto = new Fichier();
      console.log(this.userPhoto);
			return 'by clicking on a backdrop';
		} else {
      this.userPhoto = new Fichier();
      console.log(this.userPhoto);
			return `with: ${reason}`;
		}
	}

  open(content: any) {
		this.modalService.open(content, { size: 'lg', backdrop: 'static' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
      (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

  getUsers() {
    this.userService.usersWithTheirRoles().subscribe( data => {
      this.users = data;
      this.getPdp();
      for(let user of data) {
        for(let image of this.photo) {
          if(user.id == image.user.id) { user.photo = image.nom;console.log(image.nom); }
          // else user.photo = 'imageDefaultjpg.jpg';
        }
      }
    },
    err => console.log(err));
  }

  getUserId(id:string,content:any) {
    this.userService.userWithRole(id).subscribe( data => {
      this.userProfil = data;
      console.log(data);
      this.getRoles();
      this.open(content)
    },
    err => console.log(err));
  }

  getUserPhoto(idUser:string) {
    try {
      this.fichierService.getFichierByUserId(idUser).subscribe( data => {
        this.userPhoto = data;
      },
      error => {
        console.log("No photo");
        this.userPhoto = new Fichier();
      });
    } catch(error) {
      console.log("No photo");
      this.userPhoto = new Fichier();
    }
  }

  afterAddRole(id:string) {
    this.userService.userWithRole(id).subscribe( data => {
      this.userProfil = data;
      this.getRoles();
    },
    err => console.log(err));
  }

  onSubmit(submitForm: FormGroup) {
    this.createUser(submitForm);
    // this.getUsers();
    // if(this.nom != null) {
    //   this.save(submitForm);
    // }
  }
  
  createUser(submitForm: FormGroup) {   
    this.token = this.oauthService.getAccessToken();
    this.userService.create(this.userCreate,this.userCreate.password,this.token).subscribe( data => {
      console.log(data);
    },
    err => console.log(err));
    if(this.nom != null) {
      this.save(submitForm);
    }
    alert("utilisateur créé avec succès.");
    console.log(this.userCreate);
    this.getUsers();
  }

  onSelected(event: any) {
    this.nom = event.target.files;
    console.log(this.nom);
  }

  save(submitForm: FormGroup) {
    if(submitForm.valid){
      const losika=submitForm.value;
      const formData  = new FormData ();
      formData.append('projet',JSON.stringify(losika)); 
      for (const file of this.nom) { 
    
        formData.append('tdrName',file,file.name);
        console.log(file.name);
      }
      this.fichierService.savePDP(formData).subscribe(
        event => {
          console.log(event);
        },
      (error: HttpErrorResponse) => {
        console.log(error);
      })
    } else {
      console.log(submitForm);
    }
  }

  deleteUser(id:string) {
    this.userService.delete(id).subscribe( data => {
    },
    err => console.log(err));
    alert("vofafa");
    this.getUsers();
  }

  getRoles() {
    this.roleService.list().subscribe( data => {
      this.roles = data;
      console.log(this.roles);
    },
    err => console.log(err));
  }

  getRoleNotToUser(idUser:string) {
    this.userService.getRolesNotToUser(idUser).subscribe( data => {
      this.rolesNotToUser = data;
    },
    err => console.log(err));
  }

  addRoleToUser(username:string,role:string) {
    this.roleService.addRoleToUser(username,role).subscribe( data => {
      this.afterAddRole(this.userProfil.id);
      this.getRoleNotToUser(this.userProfil.id);
    },
    err => console.log(err));
  }

  removeRoleToUser(username:string,role:string) {
    this.roleService.removeRoleToUser(username,role).subscribe( data => {
      console.log("role effacé");
      this.afterAddRole(this.userProfil.id);
      this.getRoleNotToUser(this.userProfil.id);
    },
    err => console.log(err));
  }

  getPdp() {
    this.fichierService.getUsersPhoto().subscribe( data => {
      this.photo = data;
    },
    err => console.log(err));
  }
  
  exportToPDF() {
  const element = document.getElementById('userProfile');
  const opt = {
    margin: [0.5, 0.5, 0.5, 0.5],
    filename: this.userProfil.username+'.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { dpi: 192, letterRendering: true },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf()
    .from(element)
    .set(opt)
    .save();

    console.log("conversion en pdf");
  }

  getTri(){
    if(this.tri == 'role') {
      this.getRoles();
    } else if(this.tri == 'nom') {
      this.getUsers();
    }
  }

  getUserWithRoleTri() {
    if(this.roleTri == '' || this.roleTri == 'undefined' || this.roleTri == undefined || this.roleTri == null || this.roleTri == 'nule') {
      this.getUsers();
    } else {
      this.getUserwithRoleSpecified(this.roleTri);
    }
  }

  getUsersByUsername() {
    console.log("tafa e");
    if(this.nomRecherche == '') {
      this.getUsers();
    } else {
      let i = 0;
      for(let user of this.users) {
        if(user.username.startsWith(this.nomRecherche)) {
          if(i == 0) {
            this.users = [];
            i = 1;
          }
          this.users.push(user);
        } else {
          let index = this.users.indexOf(user);
          if(index > -1) {
            this.users.splice(index,1);
          }
        }
      }
    }
  }

  getUserwithRoleSpecified(role:string) {
    this.userService.getUsersByRole(role).subscribe( data => {
      this.users = data;
    },
    err => console.log(err));
  }
}
