import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLicense } from '@syncfusion/ej2-base';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
registerLicense('Mgo+DSMBaFt9QHFqVkJrW05Gc0BAXWFKblV8RmJTfl1gFChNYlxTR3ZZQFtjSn1WckVqWn5d;Mgo+DSMBPh8sVXJ2S0d+X1VPcUBAWHxLflF1VWVTfF96dVZWACFaRnZdQV1lS3hTdUZmXX9XdXRW;ORg4AjUWIQA/Gnt2V1hhQlJAfVhdX2ZWfFN0RnNfdV1xflRFcDwsT3RfQF5jT3xVdkZgXHteeXJSRQ==;MjUxMDI0M0AzMjMyMmUzMDJlMzBFeXVzc3phS1FqdDlQcWt4KzVuVFpOYzBSRDdZMU5iSlI3VjRoSkJiYkpNPQ==;MjUxMDI0NEAzMjMyMmUzMDJlMzBGREI0L3pUTFVSc1dWU1JaMm5HSVFMQm1rYVNpazZKYS9SRXp3OHMvVE5zPQ==;NRAiBiAaIQQuGjN/V0R+XU9HclRFQmFMYVF2R2BJeVRzdV9HY0wxOX1dQl9gSXhRcEVgWnpacXRRQ2M=;MjUxMDI0NkAzMjMyMmUzMDJlMzBOdjA0THRwcG9KYThBT0FhM0tFZmdEK1RLbmhhS3hVU1VkMUlVNllWd080PQ==;MjUxMDI0N0AzMjMyMmUzMDJlMzBuUXdOOUxPR2plWGhrdUlmSHFtbzBOWVVDcWl5ZFp1VDRXWUFpY2xCSlBZPQ==;Mgo+DSMBMAY9C3t2V1hhQlJAfVhdX2ZWfFN0RnNfdV1xflRFcDwsT3RfQF5jT3xVdkZgXHtfcXZRRQ==;MjUxMDI0OUAzMjMyMmUzMDJlMzBoWXk2UjM0TlQ4LzgrRzA5c2hzRE9zaGFzL0VCSG4xNkk1VjVLUGRFRjhNPQ==;MjUxMDI1MEAzMjMyMmUzMDJlMzBVVWxJeWlxdndhV21ocyswKy8wdUtpd0JjbmFMbDhhUDlnVkVkeW9VKzVBPQ==;MjUxMDI1MUAzMjMyMmUzMDJlMzBOdjA0THRwcG9KYThBT0FhM0tFZmdEK1RLbmhhS3hVU1VkMUlVNllWd080PQ==');
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
