import { Component, OnInit } from '@angular/core';

function siide() {
  let dropdown = document.getElementsByClassName('dropdown-btn');
  let i;

  for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener('click', function () {
      this.classList.toggle('active');
      var dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.display === 'block') {
        dropdownContent.style.display = 'block';
      } else {
        dropdownContent.style.display = 'block';
      }
    });
  }
}

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
siide();
  }

}
