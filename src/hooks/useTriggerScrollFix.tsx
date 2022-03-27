import { useEffect } from 'react';

/**
 * Permet de declencher l'evenement scroll quand les dépendances sont mis a jour
 * NOTE : Bypass le bug du scroll de la lib react-infinite-scroll-component
 * TODO : Trouver une vrai solution
 */
export function useTriggerScrollFix(deps: any[]) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('scroll'));
    }
  }, deps);
}
