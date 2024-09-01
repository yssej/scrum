import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Fichier } from 'src/app/models/fichier';
import { User } from 'src/app/models/user';
import { FichierService } from 'src/app/services/fichier.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  userId:string;
  userProfil:User;
  update:boolean;
  closeResult = '';
  password:string;
  pwd:string;
  userPhoto:Fichier; 
  myGroup: FormGroup;
  nom:File[];
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private loginService:LoginService,private modalService: NgbModal,private userService:UserService,private fichierService:FichierService,
    private router:Router) {
    this.myGroup = new FormGroup({
      nom: new FormControl()
    })
  }

  ngOnInit(): void {
    if(this.loginService.getIsLogged() == false) {
      this.router.navigate(['/Acceuil']);
    } else {
      this.getUserId();
      this.getUserProfil();
      this.getUserPhoto(this.loginService.getId());
    }
  }

  onSubmit(submitForm: FormGroup) {
    if(this.userPhoto.nom == null) {
      this.save(submitForm);
    } else {
      this.updatePhoto(submitForm);
    }
  }

  updatePhoto(submitForm: FormGroup) {
    if(submitForm.valid){
      const losika=submitForm.value;
      const formData  = new FormData ();
      formData.append('projet',JSON.stringify(losika)); 
      for (const file of this.nom) { 
    
        formData.append('tdrName',file,file.name);
        console.log(file.name);
      }
      this.fichierService.setUserPhoto(this.loginService.getId(),formData).subscribe(
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

  save(submitForm: FormGroup) {
    if(submitForm.valid){
      const losika=submitForm.value;
      const formData  = new FormData ();
      formData.append('projet',JSON.stringify(losika)); 
      for (const file of this.nom) { 
    
        formData.append('tdrName',file,file.name);
        console.log(file.name);
      }
      this.fichierService.savePDPOldUser(this.loginService.getId(),formData).subscribe(
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

  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  open(content: any) {
		this.modalService.open(content, { size: 'md', backdrop: 'static' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
      (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

  getUserId() {
    this.userId = this.loginService.getId();
  }

  getUserProfil() {
    this.userService.userWithRole(this.userId).subscribe( data => {
      this.userProfil = data;
    },
    err => console.log(err));
  }

  updateBtn() {
    this.update = true;
  }

  updateUser() {
    this.userService.updateUserDetail(this.userId,this.userProfil).subscribe( data => {
      this.userProfil = data;
    },
    err => console.log(err));
    alert("user updated successfully");
    this.update = false;
    this.ngOnInit();
  }

  setPassword() {
    if(this.password == this.pwd) {
      this.userService.setUserPassword(this.userId,this.password).subscribe( data => {
        
      },
      err => console.log(err));
      alert("password updated successfully");
      this.ngOnInit();
    } else {
      alert("Erreur trouvé");
    }
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  uploadImage(event:any,submitForm: FormGroup) {
    this.nom = event.target.files;
    console.log(this.nom);

    this.onSubmit(submitForm);
  }
}
