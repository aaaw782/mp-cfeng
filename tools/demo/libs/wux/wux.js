
import Toast from 'toast/toast'

export default function(scope) {
	return {
		$wuxToast      : new Toast(scope).$wuxToast, 
	}
}