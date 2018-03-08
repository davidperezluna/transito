import { Route } from '@angular/router';

import { HomeRoutes } from './home/home.routes';
import { NetworkingRoutes } from './networking/networking.routes';
import { EntertainmentRoutes } from './entertainment/entertainment.routes';
import { TodoRoutes } from './todo/todo.routes';
import { SocialRoutes } from './social/social.routes';
import { BlankPageRoutes } from './blank-page/blankPage.routes';
import { TableRoutes } from './tables/table.routes';
import { FormRoutes } from './forms/forms.routes';
import { GridRoutes } from './grid/grid.routes';

import { AccordionRoutes } from './accordion/accordion.routes';
import { AlertsandnotesRoutes } from './alertsandnotes/alertsandnotes.routes';
import { AuthorityformRoutes } from './authorityform/authorityform.routes';
import { AutocompleteRoutes } from './autocomplete/autocomplete.routes';
import { BlogRoutes } from './blog/blog.routes';
import { BlogdetailsRoutes } from './blogdetails/blogdetails.routes';
import { BookingformRoutes } from './bookingform/bookingform.routes';
import { BreadcrumbRoutes } from './breadcrumb/breadcrumb.routes';
import { ButtonsRoutes } from './buttons/buttons.routes';
import { CalendarRoutes } from './calendar/calendar.routes';
import { CardsRoutes } from './cards/cards.routes';
import { ChartjsRoutes } from './chartjs/chartjs.routes';
import { CheckoutRoutes } from './checkout/checkout.routes';
import { ChatappRoutes } from './chatapp/chatapp.routes';
import { CkeditorRoutes } from './ckeditor/ckeditor.routes';
import { ClipboardRoutes } from './clipboard/clipboard.routes';
import { ContactRoutes } from './contact/contact.routes';
import { ContextmenuRoutes } from './contextmenu/contextmenu.routes';
import { CookieRoutes } from './cookie/cookie.routes';
import { CreditcardoneRoutes } from './creditcardone/creditcardone.routes';
import { CreditcardtwoRoutes } from './creditcardtwo/creditcardtwo.routes';
import { CustomerprofileRoutes } from './customerprofile/customerprofile.routes';
import { DatatableRoutes } from './datatable/datatable.routes';
import { DonationformRoutes } from './donationform/donationform.routes';
import { DragableRoutes } from './dragable/dragable.routes';
import { DropdownRoutes } from './dropdown/dropdown.routes';
import { DropezoneRoutes } from './dropezone/dropezone.routes';
import { EmployeereviewformRoutes } from './employeereviewform/employeereviewform.routes';
import { ErroroneRoutes } from './errorone/errorone.routes';
import { ErrortwoRoutes } from './errortwo/errortwo.routes';
import { ErrorthreeRoutes } from './errorthree/errorthree.routes';
import { ErrorfourRoutes } from './errorfour/errorfour.routes';
import { FaqsRoutes } from './faqs/faqs.routes';
import { FilemanagerRoutes } from './filemanager/filemanager.routes';
import { FlagsiconsRoutes } from './flagsicons/flagsicons.routes';
import { FontawesomeiconRoutes } from './fontawesomeicon/fontawesomeicon.routes';
import { FootableRoutes } from './footable/footable.routes';
import { ForumRoutes } from './forum/forum.routes';
import { ForumdetailsRoutes } from './forumdetails/forumdetails.routes';
import { ForumtopicdetailsRoutes } from './forumtopicdetails/forumtopicdetails.routes';
import { GalleryRoutes } from './gallery/gallery.routes';
import { GooglemapRoutes } from './googlemap/googlemap.routes';
import { GooglemaptwoRoutes } from './googlemaptwo/googlemaptwo.routes';
import { HighchartRoutes } from './highchart/highchart.routes';
import { InvoiceoneRoutes } from './invoiceone/invoiceone.routes';
import { InvoicetwoRoutes } from './invoicetwo/invoicetwo.routes';
import { JvectormapRoutes } from './jvectoremap/jvectormap.routes';
import { LoadersRoutes } from './loaders/loaders.routes';
import { MailappRoutes } from './mailapp/mailapp.routes';
import { ModalRoutes } from './modal/modal.routes';
import { MultiselectRoutes } from './multiselect/multiselect.routes';
import { OrderstatusRoutes } from './orderstatus/orderstatus.routes';
import { PickerRoutes } from './picker/picker.routes';
import { PopoverRoutes } from './popover/popover.routes';
import { PricingRoutes } from './pricing/pricing.routes';
import { ProductdetailsRoutes } from './productdetails/productdetails.routes';
import { ProductsRoutes } from './products/products.routes';
import { ProfileformRoutes } from './profileform/profileform.routes';
import { ProgressbarRoutes } from './progressbar/progressbar.routes';
import { RangesliderRoutes } from './rangeslider/rangeslider.routes';
import { SearchresultRoutes } from './searchresult/searchresult.routes';
import { ServicesRoutes } from './services/services.routes';
import { SocialprofileRoutes } from './socialprofile/socialprofile.routes';
import { SurvayformRoutes } from './survayform/survayform.routes';
import { SwitchRoutes } from './switch/switch.routes';
import { TabsRoutes } from './tabs/tabs.routes';
import { ThemifyiconsRoutes } from './themifyicons/themifyicons.routes';
import { TimelineRoutes } from './timeline/timeline.routes';
import { ToastmessageRoutes } from './toastmessage/toastmessage.routes';
import { TourintroRoutes } from './tourintro/tourintro.routes';
import { TreeviewRoutes } from './treeview/treeview.routes';
import { TypographyRoutes } from './typography/typography.routes';
import { UserlistRoutes } from './userlist/userlist.routes';
import { WeathericonsRoutes } from './weathericons/weathericons.routes';
import { WizardsRoutes } from './wizards/wizards.routes';

import { MoreroundedRoutes } from './morerounded/morerounded.routes';
import { RtlRoutes } from './rtl/rtl.routes';
import { LtrRoutes } from './ltr/ltr.routes';
import { DashboardComponent } from './index';

export const DashboardRoutes: Route[] = [
    {
      path: 'dashboard',
      component: DashboardComponent,
      children: [
        ...HomeRoutes,
        ...NetworkingRoutes,
        ...EntertainmentRoutes,
        ...TodoRoutes,
        ...SocialRoutes,
        ...TableRoutes,
        ...BlankPageRoutes,
        ...FormRoutes,
        ...GridRoutes,
        ...AccordionRoutes,
        ...AlertsandnotesRoutes,
        ...AuthorityformRoutes,
        ...AutocompleteRoutes,
        ...BlogRoutes,
        ...BlogdetailsRoutes,
        ...BookingformRoutes,
        ...BreadcrumbRoutes,
        ...ButtonsRoutes,
        ...CalendarRoutes,
        ...CardsRoutes,
        ...ChartjsRoutes,
        ...CheckoutRoutes,
        ...ChatappRoutes,
        ...CkeditorRoutes,
        ...ClipboardRoutes,
        ...ContactRoutes,
        ...ContextmenuRoutes,
        ...CookieRoutes,
        ...CreditcardoneRoutes,
        ...CreditcardtwoRoutes,
        ...CustomerprofileRoutes,
        ...DatatableRoutes,
        ...DonationformRoutes,
        ...DragableRoutes,
        ...DropdownRoutes,
        ...DropezoneRoutes,
        ...EmployeereviewformRoutes,
        ...ErroroneRoutes,
        ...ErrortwoRoutes,
        ...ErrorthreeRoutes,
        ...ErrorfourRoutes,
        ...FaqsRoutes,
        ...FilemanagerRoutes,
        ...FlagsiconsRoutes,
        ...FontawesomeiconRoutes,
        ...FootableRoutes,
        ...ForumRoutes,
        ...ForumdetailsRoutes,
        ...ForumtopicdetailsRoutes,
        ...GalleryRoutes,
        ...GooglemaptwoRoutes,
        ...GooglemapRoutes,
        ...HighchartRoutes,
        ...InvoiceoneRoutes,
        ...InvoicetwoRoutes,
        ...JvectormapRoutes,
        ...LoadersRoutes,
        ...MailappRoutes,
        ...ModalRoutes,
        ...MultiselectRoutes,
        ...OrderstatusRoutes,
        ...PickerRoutes,
        ...PopoverRoutes,
        ...PricingRoutes,
        ...ProductdetailsRoutes,
        ...ProductsRoutes,
        ...ProfileformRoutes,
        ...ProgressbarRoutes,
        ...RangesliderRoutes,
        ...SearchresultRoutes,
        ...ServicesRoutes,
        ...SocialprofileRoutes,
        ...SurvayformRoutes,
        ...SwitchRoutes,
        ...TabsRoutes,
        ...ThemifyiconsRoutes,
        ...TimelineRoutes,
        ...ToastmessageRoutes,
        ...TourintroRoutes,
        ...TreeviewRoutes,
        ...TypographyRoutes,
        ...UserlistRoutes,
        ...WeathericonsRoutes,
        ...WizardsRoutes,
        ...MoreroundedRoutes,
        ...RtlRoutes,
        ...LtrRoutes
      ]
    }
];
