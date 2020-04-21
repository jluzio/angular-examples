import { Validators } from '@angular/forms'

export default {
  number: [Validators.required],
  text: [Validators.required, Validators.minLength(3)],
  url: [Validators.required, Validators.minLength(3), Validators.pattern(/https?:\/\/.+/i)]
}
