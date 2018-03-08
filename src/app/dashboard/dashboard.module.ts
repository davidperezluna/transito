import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { HomeModule } from './home/home.module';
import { NetworkingModule } from './networking/networking.module';
import { EntertainmentModule } from './entertainment/entertainment.module';
import { SocialModule } from './social/social.module';
import { TodoModule } from './todo/todo.module';
import { BlankPageModule } from './blank-page/blankPage.module';
import { TableModule } from './tables/table.module';
import { FormModule } from './forms/forms.module';
import { GridModule } from './grid/grid.module';
import { AccordionpageModule } from './accordion/accordion.module';
import { AlertsandnotesModule } from './alertsandnotes/alertsandnotes.module';
import { AuthorityformModule } from './authorityform/authorityform.module';
import { AutocompleteModule } from './autocomplete/autocomplete.module';
import { BlogModule } from './blog/blog.module';
import { BlogdetailsModule } from './blogdetails/blogdetails.module';
import { BookingformModule } from './bookingform/bookingform.module';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { ButtonsModule } from './buttons/buttons.module';
import { CalendarModule } from './calendar/calendar.module';
import { CardsModule } from './cards/cards.module';
import { ChartjsModule } from './chartjs/chartjs.module';
import { CheckoutModule } from './checkout/checkout.module';
import { ChatappModule } from './chatapp/chatapp.module';
import { CkeditorModule } from './ckeditor/ckeditor.module';
import { ClipboardpageModule } from './clipboard/clipboard.module';
import { ContactModule } from './contact/contact.module';
import { ContextmenuModule } from './contextmenu/contextmenu.module';
import { CookieModule } from './cookie/cookie.module';
import { CreditcardoneModule } from './creditcardone/creditcardone.module';
import { CreditcardtwoModule } from './creditcardtwo/creditcardtwo.module';
import { CustomerprofileModule } from './customerprofile/customerprofile.module';
import { DatatableModule } from './datatable/datatable.module';
import { DonationformModule } from './donationform/donationform.module';
import { DragableModule } from './dragable/dragable.module';
import { DropdownModule } from './dropdown/dropdown.module';
import { DropezoneModule } from './dropezone/dropezone.module';
import { EmployeereviewformModule } from './employeereviewform/employeereviewform.module';
import { ErroroneModule } from './errorone/errorone.module';
import { ErrortwoModule } from './errortwo/errortwo.module';
import { ErrorthreeModule } from './errorthree/errorthree.module';
import { ErrorfourModule } from './errorfour/errorfour.module';
import { FaqsModule } from './faqs/faqs.module';
import { FilemanagerModule } from './filemanager/filemanager.module';
import { FlagsiconsModule } from './flagsicons/flagsicons.module';
import { FontawesomeiconModule } from './fontawesomeicon/fontawesomeicon.module';
import { FootableModule } from './footable/footable.module';
import { ForumModule } from './forum/forum.module';
import { ForumdetailsModule } from './forumdetails/forumdetails.module';
import { ForumtopicdetailsModule } from './forumtopicdetails/forumtopicdetails.module';
import { GalleryModule } from './gallery/gallery.module';
import { GooglemapModule } from './googlemap/googlemap.module';
import { GooglemaptwoModule } from './googlemaptwo/googlemaptwo.module';
import { HighchartModule } from './highchart/highchart.module';
import { InvoiceoneModule } from './invoiceone/invoiceone.module';
import { InvoicetwoModule } from './invoicetwo/invoicetwo.module';
import { JvectormapModule } from './jvectoremap/jvectormap.module';
import { LoadersModule } from './loaders/loaders.module';
import { MailappModule } from './mailapp/mailapp.module';
import { ModalModule } from './modal/modal.module';
import { MultiselectModule } from './multiselect/multiselect.module';
import { OrderstatusModule } from './orderstatus/orderstatus.module';
import { PickerpageModule } from './picker/picker.module';
import { PopoverpageModule } from './popover/popover.module';
import { PricingModule } from './pricing/pricing.module';
import { ProductdetailsModule } from './productdetails/productdetails.module';
import { ProductsModule } from './products/products.module';
import { ProfileformModule } from './profileform/profileform.module';
import { ProgressbarModule } from './progressbar/progressbar.module';
import { RangesliderModule } from './rangeslider/rangeslider.module';
import { SearchresultModule } from './searchresult/searchresult.module';
import { ServicesModule } from './services/services.module';
import { SocialprofileModule } from './socialprofile/socialprofile.module';
import { SurvayformModule } from './survayform/survayform.module';
import { SwitchModule } from './switch/switch.module';
import { TabsModule } from './tabs/tabs.module';
import { ThemifyiconsModule } from './themifyicons/themifyicons.module';
import { TimelineModule } from './timeline/timeline.module';
import { ToastmessageModule } from './toastmessage/toastmessage.module';
import { TourintroModule } from './tourintro/tourintro.module';
import { TreeviewModule } from './treeview/treeview.module';
import { TypographyModule } from './typography/typography.module';
import { UserlistModule } from './userlist/userlist.module';
import { WeathericonsModule } from './weathericons/weathericons.module';
import { WizardsModule } from './wizards/wizards.module';

import { MoreroundedModule } from './morerounded/morerounded.module';
import { RtlModule } from './rtl/rtl.module';
import { LtrModule } from './ltr/ltr.module';
import { DashboardComponent } from './dashboard.component';

import {TopNavComponent} from '../shared/index';
import {SidebarComponent} from '../shared/index';
import {FooterComponent} from '../shared/index';
import {RightsidebarComponent} from '../shared/index';
import { SaComponent } from './sa/sa.component';


@NgModule({
    imports: [
        CommonModule,
      RouterModule,
      Ng2BootstrapModule.forRoot(),
      HomeModule,
        NetworkingModule,
        EntertainmentModule,
        SocialModule,
        TodoModule,
        TableModule,
        FormModule,
        GridModule,
        BlankPageModule,
        AccordionpageModule,
        AlertsandnotesModule,
        AuthorityformModule,
        AutocompleteModule,
        BlogModule,
        BlogdetailsModule,
        BookingformModule,
        BreadcrumbModule,
        ButtonsModule,
        CalendarModule,
        CardsModule,
        ChartjsModule,
        CheckoutModule,
        ChatappModule,
        CkeditorModule,
        ClipboardpageModule,
        ContactModule,
        ContextmenuModule,
        CookieModule,
        CreditcardoneModule,
        CreditcardtwoModule,
        CustomerprofileModule,
        DatatableModule,
        DonationformModule,
        DragableModule,
        DropdownModule,
        DropezoneModule,
        EmployeereviewformModule,
        ErroroneModule,
        ErrortwoModule,
        ErrorthreeModule,
        ErrorfourModule,
        FaqsModule,
        FilemanagerModule,
        FlagsiconsModule,
        FontawesomeiconModule,
        FootableModule,
        ForumModule,
        ForumdetailsModule,
        ForumtopicdetailsModule,
        GalleryModule,
        GooglemapModule,
        GooglemaptwoModule,
        HighchartModule,
        InvoiceoneModule,
        InvoicetwoModule,
        JvectormapModule,
        LoadersModule,
        MailappModule,
        ModalModule,
        MultiselectModule,
        OrderstatusModule,
        PickerpageModule,
        PopoverpageModule,
        PricingModule,
        ProductdetailsModule,
        ProductsModule,
        ProfileformModule,
        ProgressbarModule,
        RangesliderModule,
        SearchresultModule,
        ServicesModule,
        SocialprofileModule,
        SurvayformModule,
        SwitchModule,
        TabsModule,
        ThemifyiconsModule,
        TimelineModule,
        ToastmessageModule,
        TourintroModule,
        TreeviewModule,
        TypographyModule,
        UserlistModule,
        WeathericonsModule,
        WizardsModule,
        MoreroundedModule,
        RtlModule,
        LtrModule
    ],
    declarations: [DashboardComponent, TopNavComponent, SidebarComponent, FooterComponent, RightsidebarComponent, SaComponent],
    exports: [DashboardComponent, TopNavComponent, SidebarComponent, FooterComponent, RightsidebarComponent]
})

export class DashboardModule { }
