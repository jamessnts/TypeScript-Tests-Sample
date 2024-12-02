import { Locator, Page } from "@playwright/test";

//Functions

function getOrdinalSuffix(day: number): string {
    if (day > 3 && day < 21) return 'th'; // covers 11th through 19th
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

export class SlopFestPage {
    readonly page: Page;
    //Login Components
    readonly loginButton: Locator;
    readonly loginModal: Locator;
    readonly username: Locator;
    readonly password: Locator;
    readonly submitLogin: Locator;
    //Main Profile 
    readonly homeLink: Locator;
    readonly profileLink: Locator;
    readonly meGoblin: Locator;
    readonly slopFest: Locator;
    readonly recommend: Locator;
    readonly settings: Locator;
    readonly logout: Locator;
    //Slop Fest Page 
    readonly noFest: Locator;
    readonly newFestButton: Locator;
    //New Fest Modal
    readonly festModal: Locator;
    readonly festBody: Locator;
    readonly closeNewFestButton: Locator;
    readonly festName: Locator;
    readonly labelName: Locator;
    readonly startDate: Locator;
    readonly labelStart: Locator;
    readonly dateToday: Locator;
    readonly endDate: Locator;
    readonly labelEnd: Locator;
    readonly datePicker: Locator;
    readonly nextMonth: Locator;
    readonly goblinsInvited: Locator;
    readonly goblinsArrow: Locator;
    readonly labelGoblin: Locator;
    readonly inviteeSelectionList: Locator;
    readonly festOn: Locator;
    readonly nameError: Locator;
    readonly dateError: Locator;
    readonly autoOne: Locator;
    readonly autoTwo: Locator;
    //Slop Fest Page with Fests
    readonly withFests: Locator;
    readonly festNumber1: Locator;
    readonly festNumber2: Locator;
    readonly festNumber3: Locator;
    readonly deleteFest: Locator;
    readonly confirmDelete: Locator;


    constructor(page: Page) {
        this.page = page;
        //Login Components
        this.homeLink = page.getByTestId('header-logo-link');
        this.loginButton = page.getByRole('button', { name: 'Log In' });
        this.loginModal = page.getByText('OH HEY GOBLINGobb');
        this.username = page.getByLabel('Gobb ID');
        this.password = page.getByLabel('Password');
        this.submitLogin = page.getByRole('button', { name: 'Get to Sloppin\'' });
        //Main Profile
        this.profileLink = page.locator('a[href="/profile"]');
        this.meGoblin = page.getByRole('link', { name: 'Me goblin' });
        this.slopFest = page.getByRole('link', { name: 'Slop fests' });
        this.recommend = page.getByRole('link', { name: 'Recommended-A-Slop' });
        this.settings = page.getByRole('link', { name: 'Settings' });
        this.logout = page.getByRole('button', { name: 'sidebar arrow Logout' });
        //Slop Fest Page
        this.noFest = page.getByRole('heading', { name: 'YOU HAVE NO FESTS :(' });
        this.newFestButton = page.getByRole('button', { name: 'New Fest!' });
        //New Fest Modal
        this.festModal = page.getByRole('heading', { name: 'OH WE FESTIN' });
        this.festBody = page.locator('form');
        this.closeNewFestButton = page.getByRole('button', { name: 'close-button' });
        this.festName = page.getByPlaceholder('Name it');
        this.labelName = page.getByText('Name it!');
        this.startDate = page.locator('input[name="startDate"]');
        this.labelStart = page.getByText('Start Date');
        this.dateToday = page.locator('div[aria-current="date"]');
        this.endDate = page.locator('input[name="endDate"]');
        this.labelEnd = page.getByText('End Date');
        this.datePicker = page.locator('.react-datepicker__current-month');
        this.nextMonth = page.getByLabel('Next Month');
        this.goblinsInvited = page.getByPlaceholder('Choose Invitees');
        this.goblinsArrow = page.locator('img[src="/assets/form-down-triangle-6f2c83d6.svg"][class="h-2.5 w-2.5"]');
        this.labelGoblin = page.getByText('Goblins Invited');
        this.inviteeSelectionList = page.getByLabel('', { exact: true });
        this.festOn = page.getByRole('button', { name: 'Fest on!' });
        this.nameError = page.getByText('Must contain more than one');
        this.autoOne = page.getByText('automateOne');
        this.autoTwo = page.getByText('automateTwo');

        //Slop Fest Page with Fests
        this.withFests = page.getByRole('heading', { name: 'YOUR FESTS' });
        this.festNumber1 = page.getByRole('link', { name: 'Fest No Invited Users' });
        this.festNumber2 = page.getByRole('link', { name: 'Another Fest With No Invited' });
        this.festNumber3 = page.getByRole('link', { name: 'Fest With Users Invited' });
        this.deleteFest = page.getByRole('button', { name: 'Delete' });
        this.confirmDelete = page.getByRole('button', { name: 'Confirm' });


    }
    //Functions
    //Load page
    async getCurrentURL() {
        return this.page.url();

    }
    //Logging In
    //Click Login Button
    async clickLoginButton() {
        await this.loginButton.click();

    }

    //Confirm Login
    async checkProfileName() {
        await this.profileLink.isVisible();
    }

    //Navigate to Profile
    async profileHome() {
        await this.profileLink.click();
    }

    /**
* Parameterized method to enter credentials
* @param gobbId - string
* @param password - string
*/

    //Login User
    async loginUser(gobbId: string, password: string) {
        await this.clickLoginButton();
        await this.loginModal.isVisible();
        await this.username.fill(gobbId);
        await this.password.fill(password);
        await this.submitLogin.click();
    }

    //Navigations
    //Navigate to Home page
    async goHome() {
        await this.homeLink.click();
    }
    //Navigate to Me Goblin Page
    async goMeGoblin() {
        await this.meGoblin.click();
    }

    //Navigate to Slop Fest Page
    async goSlopFest() {
        await this.slopFest.click();
    }

    //Navigate to Recommend a Slop Page
    async goRecommend() {
        await this.recommend.click();
    }

    //Navigate to Settings Page
    async goSettings() {
        await this.settings.click();
    }

    //Logout
    async goLogout() {
        await this.logout.click();
    }

    //New Fest
    //Open the New Fest Modal
    async newFestclick() {
        await this.newFestButton.click();
    }

    //Close the New Fest Modal
    async clickClose() {
        await this.closeNewFestButton.click();
    }

    //Entering a fest name value
    async enterFestName(Name: string) {
        await this.festName.click();
        await this.festName.fill(Name);
    }


    //Open Start Date pop up
    async openStartDate() {
        await this.startDate.click();
    }

    //Selecting today's date using selector
    async selectToday() {
        await this.dateToday.click();
    }


    //Open End Date pop up
    async openEndDate() {
        await this.endDate.click();
    }

    //Creating Date Label
    dateFormat(date: Date): string {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        };
        const formattedDate = date.toLocaleDateString('en-US', options);
        const day = date.getDate();
        const ordinalSuffix = getOrdinalSuffix(day);

        // Replace the day value with day + ordinal suffix
        const formattedDateWithOrdinal = formattedDate.replace(day.toString(), `${day}${ordinalSuffix}`);

        return `Choose ${formattedDateWithOrdinal}`;
    }

    //Generate different dates
    differentDate(addedDays: number): Locator {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + addedDays);
        const generatedDate = this.dateFormat(targetDate);
        return this.page.locator(`div[aria-label="${generatedDate}"]`);
    }

    //Select different date
    async selectDate(addedDays: number) {
        const selectedDate = this.differentDate(addedDays);
        const maxRetries = 12;
        for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            // Attempt to click the date with a timeout
            await selectedDate.click({ timeout: 2000 }); 
            return;
        } catch (e) {
            // Click the "Next Month" button
            await this.clickNextMOnth(); 
        }
    }
} 


    //Click the next month
    async clickNextMOnth() {
        await this.nextMonth.click();

    }

    //Open Invitees list
    async openInvitees() {
        await this.goblinsInvited.click();
        await this.goblinsArrow.click();
    }


    //Create Fest
    async submitFest() {
        await this.festOn.click();
    }

    //Open Slop Fest One
    async openFest1() {
        await this.festNumber1.click();
    }

    //Open Slop Fest 2
    async openFest2() {
        await this.festNumber2.click();
    }

    //Delete the Fest
    async deleteTheFests() {
        await this.deleteFest.click();
        await this.confirmDelete.click();
    }

    //Select AutomateOne as an invitee
    async automateOne (){
        await this.autoOne.scrollIntoViewIfNeeded();
        await this.autoOne.click();
    }

    //Select AutomateTwo as an invitee
    async automateTwo (){
        await this.autoTwo.scrollIntoViewIfNeeded();
        await this.autoTwo.click();
    }


}








