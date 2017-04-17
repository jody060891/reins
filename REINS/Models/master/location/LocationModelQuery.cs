using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Core.DTO.Master;
using HITS.Models.DataQuery;

namespace HITS.Models.master.location
{
    public class LocationModelQuery : BaseDataQuery<LocationModel>
    {

        public override void Configure()
        {
            if (searchTerm != null)
            {
                Search(s => s.location_name.ToLower().Contains(searchTerm.ToLower()));
            }

            if (sort != null)
            {
                sort.ForEach(s =>
                {
                    if (s.active)
                        switch (s.identifier)
                        {
                            case "location_name":
                                OrderBy(t => t.location_name, s.asc);
                                break;
                        }
                    ;
                });
            }

        }
    }
}