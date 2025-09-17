
import React from 'react';
import { ChevronRightIcon, CloseIcon, EditIcon } from '../icons';

export const MapsRightSidebar: React.FC = () => {
    return (
        <aside className="col-span-3 flex flex-col justify-between">
            <div>
                <div className="bg-accent-primary text-white rounded-2xl p-6 mb-6">
                    <div className="flex justify-between items-start">
                        <p className="text-xl font-semibold">Coolaǝǝator For Proctlice</p>
                        <button className="bg-white/20 rounded-full p-2"><ChevronRightIcon/></button>
                    </div>
                    <p className="text-white/80 mt-4">7e| S07</p>
                    <p className="text-white/80">2000 J0Irġ ɓəgus)</p>
                </div>
                
                <div className="flex items-center justify-between text-text-on-light-muted mb-6">
                    <span>Bdedalì tot Wedrìt</span>
                    <EditIcon />
                </div>

                <div className="bg-light-secondary text-text-on-light-muted font-semibold rounded-full px-4 py-3 flex items-center justify-between mb-8">
                    <span>Conir giod Coiistəity</span>
                    <button className="bg-gray-400 text-white rounded-full p-1"><CloseIcon /></button>
                </div>

                <div className="space-y-4 text-text-on-light-strong">
                    <div className="flex items-center justify-between"><span>Thite Contimed</span> <ChevronRightIcon/></div>
                    <div className="flex items-center justify-between"><span>Toulil Gopdetao)</span> <ChevronRightIcon/></div>
                    <div className="flex items-center justify-between"><span>Uofailt Drəcab</span> <ChevronRightIcon/></div>
                </div>
                
                <div className="border-t border-light-secondary my-8"></div>

                <p className="text-text-on-light-strong mb-2">Tinthue lesclestel</p>
                <p className="text-text-on-light-muted">Uul ßilt ətte Wehlìy :b</p>
            </div>

            <button className="w-full bg-dark-primary text-white font-semibold py-4 rounded-full hover:bg-dark-secondary transition-colors">
                Continue task
            </button>
        </aside>
    );
};
