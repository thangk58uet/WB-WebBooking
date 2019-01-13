import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TourDuThuyenService } from '../tour-du-thuyen/tour-du-thuyen.service';
import { CommonService } from '../../service/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DetailsDuThuyenService } from './details-du-thuyen.service';
import { UploadFileService } from 'src/app/service/upload-file.service';
import { InformationComponent } from './../book-du-thuyen/information/information.component';

declare var google: any;

@Component({
  selector: 'app-details-du-thuyen',
  templateUrl: './details-du-thuyen.component.html',
  styleUrls: ['./details-du-thuyen.component.scss']
})
export class DetailsDuThuyenComponent implements OnInit {

  public fromDate = new Date();
  public toDate = new Date();
  public listBoat: any = [];
  public detailBoat: any = {};
  public listImages: any = [];
  public linkImage = '';
  public dateBookBoat = new Date();
  public boatTour: any = [];
  public countImage = 0;

  public popupShowImage = false;
  public popupShowImageComment = false;

  public latitude;
  public longitude;

  public indexImage = null;
  public typeBoat;
  public location;
  public listLocation: any = [];
  public listTypeBoat: any = [];
  public listAccessoryFree = [];
  public listAccessoryId: any = [];
  public listAccessoryPaid = [];
  public contentComment = '';  /*Creat Comment*/
  public listComment: any = [];
  public userName = 'userName';
  public filePost: any = {};
  public imageId = '';
  public contentNameComment = ''; /*popup show Image Comment*/
  public nameTitleShowImage = '';
  public linkImageComment = '';
  public userInfo = {
    lastName: '',
    email: '',
    phoneNumber: ''
  };
  public token = '';
  public popupLogin = false;
  @ViewChild(InformationComponent) informationComponent: InformationComponent;

  constructor(private tourDuThuyenService: TourDuThuyenService,
              public commonService: CommonService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private detailsDuThuyenService: DetailsDuThuyenService,
              private uploadFileService: UploadFileService,
              private cookieService: CookieService) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    // Load google maps script after view init
    const DSLScript = document.createElement('script');

    DSLScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDYWdmQ2indDeIb1IwJ_FTmc4czofdvWqo'; // replace by your API key
    DSLScript.type = 'text/javascript';
    document.body.appendChild(DSLScript);
    this.getDetailBoat();

  }

  ngOnInit() {
    this.token = this.cookieService.get('token');

    this.getBoatTour();
    this.getAccessory();
    this.getAccesssoryType();
    this.getListBoatType();
    this.getListLocation();
    this.getListAcessoryType();
    this.getListComment();
    this.getUserInfo();
  }

  getUserInfo() {
    this.userInfo.lastName = this.cookieService.get('lastName');
    this.userInfo.email = this.cookieService.get('email');
    this.userInfo.phoneNumber = this.cookieService.get('phoneNumber');
  }

  getBoatTour() {
    const dateParams = this.dateBookBoat.toJSON().slice(0, 10);
    this.commonService.dateBook = dateParams;
    this.commonService.getBoatTour(this.activatedRoute.snapshot.queryParams.id, { date: dateParams }).subscribe( res => {
      this.boatTour = (res && res['value']) ? res['value'] : [];
    });
  }

  getListLocation() {
    this.commonService.getListProvince().subscribe( res => {
      if (res && res['value']) {
        for (let index = 0; index < res['value'].length; index++) {
          this.listLocation.push(res['value'][index].name);
        }
      }
    });
  }

  getListBoatType() {
    this.typeBoat = this.activatedRoute.snapshot.queryParams.typeBoat;
    this.commonService.getListTypeBoat().subscribe( res => {
      if (res && res['value']) {
        for (let index = 0; index < res['value'].length; index++) {
          this.listTypeBoat.push(res['value'][index].name);
        }
      }
    });
  }

  prevImage() {
    this.countImage -= 1;
    this.indexImage = this.countImage;
    if (this.countImage >= 0) {
      this.linkImage = this.commonService.pathImage + this.listImages[this.countImage].reference;
    }
  }

  nextImage() {
    this.countImage += 1;
    this.indexImage = this.countImage;
    if (this.countImage < this.listImages.length) {
      this.linkImage = this.commonService.pathImage + this.listImages[this.countImage].reference;
    }
  }

  getDetailBoat() {
    this.commonService.getDetailBoatById(this.activatedRoute.snapshot.queryParams.id).subscribe( res => {
      this.detailBoat = (res && res['value']) ? res['value'] : [];
      this.location = this.detailBoat.province.name;
      this.listImages = this.detailBoat.images;
      if (this.listImages && this.listImages.length > 0) {
        this.linkImage = this.commonService.pathImage + this.listImages[0].reference;
      }
      if (this.detailBoat.province) {
        const lat = this.detailBoat.province.latitude;
        const long = this.detailBoat.province.longitude;
        this.latitude = lat;
        this.longitude = long;
        if (lat && long) {
          // tslint:disable-next-line:radix
          setTimeout(()=> {
            this.gmt_init_map(Number(lat), Number(long), 'google_map', parseInt('11'),
            'ROADMAP', '', true, false, true);
          }, 1500);
         
        }
      }
    });
  }

  viewImage(linkImage, name) {
    this.nameTitleShowImage = name;
    this.popupShowImage = true;
  }

  viewImageComment(linkImage, content) {
    this.contentNameComment = content;
    this.popupShowImageComment = true;
    this.linkImageComment = linkImage;
  }

  selectImage(index) {
    this.indexImage = index;
    this.linkImage = this.commonService.pathImage + this.listImages[index].reference;
  }

  selectLocation(e) {}

  selectTypeBoat(e) {}

  selectPrice(e) {}

  search() {}

  getAccessory() {
    this.commonService.getAccessory().subscribe( res => {

    });
  }

  getAccesssoryType() {
    this.commonService.getAccessoryType().subscribe ( res => {

    });
  }

  bookTour(price, id) {
    const date = this.dateBookBoat.toJSON().slice(0, 10);
    const tourId = id;
    const locationId = this.detailBoat.province.id;
    const boatTypeId = this.detailBoat.type.id;
    const name = this.detailBoat.name;
    for (let index = 0; index < this.commonService.detailsBook.length; index++) {
      this.commonService.detailsBook[index].endHour = this.commonService.detailsBook[index].startHour +
      this.commonService.detailsBook[index].duration;
    }
    this.router.navigate(['/book/information'], { queryParams: { boatTypeId, tourId, date, locationId, name }});
  }

  getListAcessoryType() {
    this.detailsDuThuyenService.getAccessoryType('FREE').subscribe( res => {
      this.listAccessoryFree = (res && res['value'] && res['value'][0].accessories) ? res['value'][0].accessories : [];
      for (let index = 0; index < this.listAccessoryFree.length; index++) {
        this.listAccessoryId.push(this.listAccessoryFree[index].id);
      }
    });

    this.detailsDuThuyenService.getAccessoryType('PAID').subscribe( res => {
      this.listAccessoryPaid = (res && res['value'] && res['value'][0].accessories) ? res['value'][0].accessories : [];
    });
  }

  getListComment() {
    this.detailsDuThuyenService.getComment().subscribe( res => {
      this.listComment = (res && res['value'] && res['value'].list) ? res['value'].list : [];
      if (this.listComment) {
        for (let index = 0; index < this.listComment.length; index++) {
          if (this.listComment[index].image) {
            this.listComment[index].linkImageComment = this.commonService.pathImage + this.listComment[index].image.reference;
          }
        }
      }
    });
  }

  creatComment() {
    const params = {
      boatId: this.activatedRoute.snapshot.queryParams.id,
      content: this.contentComment,
      type: 'BOAT',
      imageId: this.imageId
    };
    this.detailsDuThuyenService.creatComment(params).subscribe( res => {
      location.reload();
    });
  }

  fileChange(e) {
    this.filePost = e.files[0];
    this.uploadFileService.uploadFile('/image/upload', this.filePost).subscribe( res => {
      this.imageId = (res && res['value']) ? res['value'].id : '';
    });
  }

  gmt_init_map(Lat, Lng, map_canvas_id, zoom, maptype, info,
    show_marker, show_popup, scrollwheel) {
      const latLng = new google.maps.LatLng(Lat, Lng);

      switch (maptype) {
      case 'SATELLITE':
        maptype = google.maps.MapTypeId.SATELLITE;
        break;

      case 'HYBRID':
        maptype = google.maps.MapTypeId.HYBRID;
        break;

      case 'TERRAIN':
        maptype = google.maps.MapTypeId.TERRAIN;
        break;

      default:
        maptype = google.maps.MapTypeId.ROADMAP;
        break;

      }

    const map = new google.maps.Map(document.getElementById(map_canvas_id), {
      zoom : zoom,
      center : latLng,
      mapTypeId : maptype,
      scrollwheel : scrollwheel
    });

    if (show_marker) {
      this.showMarker(map, latLng);
    }

    google.maps.event.addListener(map, 'click', function(event) {
      console.log(event.latLng.lat() + ' ' + event.latLng.lng());
      // if (marker) {
      //     marker.setMap(null);
      // }
      // $("#idProvinceLatitude").val(event.latLng.lat());
      // $("#idProvinceLongitude").val(event.latLng.lng());
      // showMarker(event.latLng);
    });

    google.maps.event.addListener(map, 'zoom_changed', function() {
      // $("#map_zoom").val(map.zoom);
    });

    }

  showMarker(map, latLng) {
    const marker = new google.maps.Marker({
      position : latLng,
      draggable : false,
      map : map
    });
  }

  login() {
    this.popupLogin = true;
  }

  checkBox(e) {
    console.log(e);
  }

}
