import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@material/material.module';
import { HttpResponseService } from '@core/services/http-response.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CoreModule,
  ],
  providers: [HttpResponseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
